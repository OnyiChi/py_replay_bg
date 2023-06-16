from environment.environment import Environment
from model.single_meal_t1d_model import SingleMealT1DModel

from sensors.sensors import CGM, Sensors
from dss.dss import DSS
from dss.default_dss_handlers import default_meal_generator_handler, standard_bolus_calculator_handler, default_basal_handler, ada_hypotreatments_handler, corrects_above_250_handler

from data.data import ReplayBGData

import matplotlib.pyplot as plt

import zeus
#from identification.identifier import Identifier

### EXPERIMENTING ###
#import arviz as az
#import matplotlib.pyplot as plt
#import numpy as np
#import pandas as pd
#import pymc as pm
#import pytensor
#import pytensor.tensor as pt
#from pymc.ode import DifferentialEquation
#from pytensor.compile.ops import as_op
#from scipy.integrate import odeint
#from scipy.optimize import least_squares
#from numba import njit
#####################

class ReplayBG:
    """
    Core class of ReplayBG
    
    ...
    Attributes 
    ----------
    environment: Environment
        An object that represents the hyperparameters to be used by ReplayBG environment.
    model: Model
        An object that represents the physiological model to be used by ReplayBG.
    sensors: Sensors
        An object that represents the sensors to be used by ReplayBG.
    mcmc: MCMC
        An object that represents the hyperparameters of the MCMC identification procedure.
    dss: DSS
        An object that represents the hyperparameters of the integrated decision support system.

    Methods
    -------
    run():
        Runs ReplayBG.
    """
    def __init__(self, modality, data, BW, scenario, save_name, 
              yts = 5, glucose_model = 'IG', pathology = 't1d', exercise = False, seed = 1,
              bolus_source = 'data', basal_source = 'data', cho_source = 'data', 
              cgm_model = 'IG',
              CR = 10, CF = 40, GT = 120,
              meal_generator_handler = default_meal_generator_handler, meal_generator_handler_params = {},
              bolus_calculator_handler = standard_bolus_calculator_handler, bolus_calculator_handler_params = {},
              basal_handler = default_basal_handler, basal_handler_params = {},
              enable_hypotreatments = False, hypotreatments_handler = ada_hypotreatments_handler, hypotreatments_handler_params = {},
              enable_correction_boluses = False, correction_boluses_handler = corrects_above_250_handler, correction_boluses_handler_params = {},
              save_suffix = '',
              plot_mode = True, enable_log = True, verbose = True):
        """
        Constructs all the necessary attributes for the ReplayBG object.

        Parameters
        ----------
        modality : string, {'identification', 'replay'}
            A string that specifies if the function will be used to identify 
            the ReplayBG model on the given data or to replay the scenario specified by 
            the given data.
        data: pd.DataFrame
            Pandas dataframe which contains the data to be used by the tool.
        BW: double
            The patient's body weight.
        scenario: string, {'single-meal', 'multi-meal'}
            A string that specifies whether the given scenario refers to a single-meal scenario or a multi-meal scenario.
        save_name : string
            A string used to label, thus identify, each output file and result.

        yts: int, optional, default : 5
            An integer that specifies the data sample time (in minutes).
        glucose_model: string, {'IG','BG'}
            The model equation to be used as measured glucose.
        pathology: string, {'t1d', 't2d', 'pbh', 'healthy'}, optional, default: 't1d' 
            A string that specifies the patient pathology.
        exercise: boolean, optional, default : False
            A boolean that specifies whether to simulate exercise or not.
        seed: int, optional, default: 1
            An integer that specifies the random seed. For reproducibility.

        bolus_source : string, {'data', or 'dss'}, optional, default : 'data'
            A string defining whether to use, during replay, the insulin bolus data contained in the 'data' timetable (if 'data'),
            or the boluses generated by the bolus calculator implemented via the provided 'bolusCalculatorHandler' function.
        basal_source : string, {'data', 'u2ss', or 'dss'}, optional, default : 'data'
            A string defining whether to use, during replay, the insulin basal data contained in the 'data' timetable (if 'data'), 
            or the basal generated by the controller implemented via the provided 'basalControllerHandler' function (if 'dss'), 
            or fixed to the average basal rate used during identification (if 'u2ss').
        cho_source : string, {'data', 'generated'}, optional, default : 'data'
            A string defining whether to use, during replay, the CHO data contained in the 'data' timetable (if 'data'), 
            or the CHO generated by the meal generator implemented via the provided 'mealGeneratorHandler' function.
        
        cgm_model: string, {'CGM','IG'}, optional, default : 'CGM'
            A string that specify the cgm model selection.
            If IG is selected, CGM measure will be the noise-free IG state at the current time.

        CR: double, optional, default : 10
            The carbohydrate-to-insulin ratio of the patient in g/U to be used by the integrated decision support system.
        CF: double, optional, default : 40
            The correction factor of the patient in mg/dl/U to be used by the integrated decision support system.
        GT: double, optional, default : 120
            The target glucose value in mg/dl to be used by the decsion support system modules.
        meal_generator_handler: function, optional, default : default_meal_generator_handler
            A callback function that implements a meal generator to be used during the replay of a given scenario.
        meal_generator_handler_params: dict, optional, default : {}
            A dictionary that contains the parameters to pass to the meal_generator_handler function.
        bolus_calculator_handler: function, optional, default : standard_bolus_calculator_handler
            A callback function that implements a bolus calculator to be used during the replay of a given scenario.
        bolus_calculator_handler_params: dict, optional, default : {}
            A dictionary that contains the parameters to pass to the bolusCalculatorHandler function. It also serves as memory
            area for the bolusCalculatorHandler function.
        basal_handler: function, optional, default : default_basal_handler
            A callback function that implements a basal controller to be used during the replay of a given scenario.
        basal_handler_params: dict, optional, default : {}
            A dictionary that contains the parameters to pass to the basalHandler function. It also serves as memory area for the basalHandler function.
        enable_hypotreatments: boolean, optional, default : False
            A flag that specifies whether to enable hypotreatments during the replay of a given scenario.
        hypotreatments_handler: function, optional, default : ada_hypotreatments_handler
            A callback function that implements an hypotreatment strategy during the replay of a given scenario.
        hypotreatments_handler_params: dict, optional, default : {}
            A dictionary that contains the parameters to pass to the hypoTreatmentsHandler function. It also serves as memory
            area for the hypoTreatmentsHandler function.
        enable_correction_boluses: boolean, optional, default : False
            A flag that specifies whether to enable correction boluses during the replay of a given scenario.
        correction_boluses_handler: function, optional, default : corrects_above_250_handler
            A callback function that implements a corrective bolusing strategy during the replay of a given scenario.
        correction_boluses_handler_params: dict, optional, default : {}
            A dictionary that contains the parameters to pass to the correctionBolusesHandler function. It also serves as memory
            area for the correctionBolusesHandler function.

        save_suffix : string, optional, default : ''
            A string to be attached as suffix to the resulting output files' name.

        plot_mode : boolean, optional, default : True
            A boolean that specifies whether to show the plot of the results or not.
        enable_log : boolean, optional, default : True
            A boolean that specifies whether to log the output of ReplayBG not.
        verbose : boolean, optional, default : True
            A boolean that specifies the verbosity of ReplayBG.

        Returns
        -------
        None

        Raises
        ------
        None

        See Also
        --------
        None

        Examples
        --------
        None

        References
        --------
        Cappon et al., "ReplayBG: a methodology to identify a personalized model from type 1 diabetes data and simulate glucose concentrations to
        assess alternative therapies", IEEE TBME, 2022 (under revision).
        """

        #TODO: add input validators

        # ================ Initialize core variables =========================
        self.environment, self.model, self.sensors, self.mcmc, self.dss = self.__init_core_variables(data = data, BW = BW, modality = modality, save_name = save_name, save_suffix = save_suffix, scenario = scenario,
                                                                yts = yts, glucose_model = glucose_model, pathology = pathology, exercise = exercise, seed = seed,
                                                                bolus_source = bolus_source, basal_source = basal_source, cho_source = cho_source,
                                                                cgm_model = 'CGM',
                                                                CR = CR, CF = CF, GT = GT, 
                                                                meal_generator_handler = meal_generator_handler, meal_generator_handler_params = meal_generator_handler_params,
                                                                bolus_calculator_handler = bolus_calculator_handler, bolus_calculator_handler_params = bolus_calculator_handler_params,
                                                                basal_handler = basal_handler, basal_handler_params = basal_handler_params,
                                                                enable_hypotreatments = enable_hypotreatments, hypotreatments_handler = hypotreatments_handler, hypotreatments_handler_params = hypotreatments_handler_params,
                                                                enable_correction_boluses = enable_correction_boluses, correction_boluses_handler = correction_boluses_handler, correction_boluses_handler_params = correction_boluses_handler_params,
                                                                plot_mode = plot_mode, enable_log = enable_log, verbose = verbose)

        # ====================================================================

        # ================ Unpack data for efficiency (before default model parameter setup) ========================
        #t, glucose, bolus, basal, cho, bolus_label, cho_label, exercise = unpack_data(data) 
        # ====================================================================

    def __init_core_variables(self,data, BW, modality, save_name, save_suffix, scenario, 
                            yts, glucose_model, pathology, exercise, seed,
                            bolus_source, basal_source, cho_source, 
                            cgm_model,
                            CR, CF, GT, 
                            meal_generator_handler, meal_generator_handler_params,
                            bolus_calculator_handler, bolus_calculator_handler_params,
                            basal_handler, basal_handler_params,
                            enable_hypotreatments, hypotreatments_handler, hypotreatments_handler_params,
                            enable_correction_boluses, correction_boluses_handler, correction_boluses_handler_params,
                            plot_mode, enable_log, verbose):
        """
        Initializes the core variables (i.e., environment, model, sensors, mcmc, and dss) of ReplayBG.

        Parameters
        ----------
        data : pd.DataFrame
                Pandas dataframe which contains the data to be used by the tool.
        BW : double
            The patient's body weight.
        modality : string
            A string that specifies if the function will be used to identify 
            the ReplayBG model on the given data or to replay the scenario specified by the given data
        save_name : string
            A string used to label, thus identify, each output file and result.
        save_suffix : string
            A string to be attached as suffix to the resulting output files' name.
        scenario: string
            A string that specifies whether the given scenario refers to a single-meal scenario or a multi-meal scenario
        yts: int
            An integer that specifies the data sample time (in minutes).
        glucose_model: string, {'IG','BG'}
            The model equation to be used as measured glucose.
        pathology: string, {'t1d', 't2d', 'pbh', 'healthy'}
            A string that specifies the patient pathology.
        exercise: boolean
            A boolean that specifies whether to simulate exercise or not.
        seed: int
            An integer that specifies the random seed. For reproducibility.
        bolus_source : string, {'data', or 'dss'}
            A string defining whether to use, during replay, the insulin bolus data contained in the 'data' timetable (if 'data'),
            or the boluses generated by the bolus calculator implemented via the provided 'bolusCalculatorHandler' function.
        basal_source : string, {'data', 'u2ss', or 'dss'}
            A string defining whether to use, during replay, the insulin basal data contained in the 'data' timetable (if 'data'), 
            or the basal generated by the controller implemented via the provided 'basalControllerHandler' function (if 'dss'), 
            or fixed to the average basal rate used during identification (if 'u2ss').
        cho_source : string, {'data', 'generated'}
            A string defining whether to use, during replay, the CHO data contained in the 'data' timetable (if 'data'), 
            or the CHO generated by the meal generator implemented via the provided 'mealGeneratorHandler' function.
        cgm_model: string, {'CGM','IG'}
            A string that specify the cgm model selection.
            If IG is selected, CGM measure will be the noise-free IG state at the current time.

        bolus_source : string, {'data', or 'dss'}
            A string defining whether to use, during replay, the insulin bolus data contained in the 'data' timetable (if 'data'),
            or the boluses generated by the bolus calculator implemented via the provided 'bolusCalculatorHandler' function.
        basal_source : string, {'data', 'u2ss', or 'dss'}
            A string defining whether to use, during replay, the insulin basal data contained in the 'data' timetable (if 'data'), 
            or the basal generated by the controller implemented via the provided 'basalControllerHandler' function (if 'dss'), 
            or fixed to the average basal rate used during identification (if 'u2ss').
        cho_source : string, {'data', 'generated'}
            A string defining whether to use, during replay, the CHO data contained in the 'data' timetable (if 'data'), 
            or the CHO generated by the meal generator implemented via the provided 'mealGeneratorHandler' function.
        
        cgm_model: string, {'CGM','IG'}
            A string that specify the cgm model selection.
            If IG is selected, CGM measure will be the noise-free IG state at the current time.

        CR: double
            The carbohydrate-to-insulin ratio of the patient in g/U to be used by the integrated decision support system.
        CF: double
            The correction factor of the patient in mg/dl/U to be used by the integrated decision support system.
        GT: double
            The target glucose value in mg/dl to be used by the decsion support system modules.
        meal_generator_handler: function
            A callback function that implements a meal generator to be used during the replay of a given scenario.
        meal_generator_handler_params: dict
            A dictionary that contains the parameters to pass to the meal_generator_handler function.
        bolus_calculator_handler: function
            A callback function that implements a bolus calculator to be used during the replay of a given scenario.
        bolus_calculator_handler_params: dict
            A dictionary that contains the parameters to pass to the bolusCalculatorHandler function. It also serves as memory
            area for the bolusCalculatorHandler function.
        basal_handler: function
            A callback function that implements a basal controller to be used during the replay of a given scenario.
        basal_handler_params: dict
            A dictionary that contains the parameters to pass to the basalHandler function. It also serves as memory area for the basalHandler function.
        enable_hypotreatments: boolean
            A flag that specifies whether to enable hypotreatments during the replay of a given scenario.
        hypotreatments_handler: function
            A callback function that implements an hypotreatment strategy during the replay of a given scenario.
        hypotreatments_handler_params: dict
            A dictionary that contains the parameters to pass to the hypoTreatmentsHandler function. It also serves as memory
            area for the hypoTreatmentsHandler function.
        enable_correction_boluses: boolean
            A flag that specifies whether to enable correction boluses during the replay of a given scenario.
        correction_boluses_handler: function
            A callback function that implements a corrective bolusing strategy during the replay of a given scenario.
        correction_boluses_handler_params: dict
            A dictionary that contains the parameters to pass to the correctionBolusesHandler function. It also serves as memory
            area for the correctionBolusesHandler function.

        plot_mode : boolean
            A boolean that specifies whether to show the plot of the results or not.
        enable_log : boolean
            A boolean that specifies whether to log the output of ReplayBG not.
        verbose : boolean
            A boolean that specifies the verbosity of ReplayBG.

        Returns
        -------
        environment: Environment
            An object that represents the hyperparameters to be used by ReplayBG environment.
        model: Model
            An object that represents the physiological model hyperparameters to be used by ReplayBG.
        sensors: Sensors
            An object that represents the sensors to be used by ReplayBG.
        mcmc: MCMC
            An object that represents the hyperparameters of the MCMC identification procedure.
        dss: DSS
            An object that represents the hyperparameters of the integrated decision support system.

        Raises
        ------
        None

        See Also
        --------
        None

        Examples
        --------
        None
        """

        #Initialize the environment parameters
        environment = Environment(modality = modality, save_name = save_name, save_suffix = save_suffix, scenario = scenario,
            bolus_source = bolus_source, basal_source = basal_source, cho_source = cho_source, seed = seed,
            plot_mode = plot_mode, enable_log = enable_log, verbose = verbose)

        #Initialize model
        if scenario == 'single-meal':
            if pathology == 't1d':
                if ~exercise:
                    model = SingleMealT1DModel(data = data, BW = BW, environment = environment, ts = 1, yts = yts, glucose_model = glucose_model)

        #Initialize sensors
        sensors = self.__init_sensors(cgm_model, model)

        #TODO: set mcmc
        mcmc = [] 

        #Initialize DSS
        dss = DSS(BW = BW, CR = CR, CF = CF, GT = GT, 
                  meal_generator_handler = meal_generator_handler, meal_generator_handler_params = meal_generator_handler_params,
                  bolus_calculator_handler = bolus_calculator_handler, bolus_calculator_handler_params = bolus_calculator_handler_params,
                  basal_handler = basal_handler, basal_handler_params = basal_handler_params,
                  enable_hypotreatments = enable_hypotreatments, hypotreatments_handler = hypotreatments_handler, hypotreatments_handler_params = hypotreatments_handler_params,
                  enable_correction_boluses = enable_correction_boluses, correction_boluses_handler = correction_boluses_handler, correction_boluses_handler_params = correction_boluses_handler_params)

        return environment, model, sensors, mcmc, dss


    def __init_sensors(self,cgm_model, model):
        """
        Utility function that initializes the sensor core object.

        Parameters
        ----------

        Returns
        -------

        Raises
        ------
        None

        See Also
        --------
        None

        Examples
        --------
        None
        """
        #Init the CGM sensor
        cgm = CGM(ts = model.yts, model = cgm_model)

        #return the object
        return Sensors(cgm = cgm)
    

    def run(self, data, BW):
        """
        Runs ReplayBG.

        Parameters
        ----------

        Returns
        -------

        Raises
        ------
        None

        See Also
        --------
        None

        Examples
        --------
        None
        """
        if self.environment.modality == 'identification':
            pass
            #Run identification
            #idf = Identifier()
            #idf.identify(self, data = data, BW = BW)

        else:

            rbg_data = ReplayBGData(data = data, BW = BW, rbg = self)
            [G, CGM, x] = self.model.simulate(rbg_data = rbg_data, rbg = self)
            plt.plot(G)
            plt.show()
