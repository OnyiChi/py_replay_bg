import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,a,o as l}from"./app-RzV1NTZK.js";const t={};function n(o,i){return l(),s("div",null,i[0]||(i[0]=[a(`<h1 id="analyzing-replay-results" tabindex="-1"><a class="header-anchor" href="#analyzing-replay-results"><span>Analyzing replay results</span></a></h1><p>ReplayBG provides the possibility, to analyze in a painless way the results of <code>rbg.replay()</code>. To this aim, ReplayBG integrates the <a href="https://github.com/gcappon/py_agata" target="_blank" rel="noopener noreferrer">AGATA</a> software for analyzing the simulated glucose and CGM profiles, a dedicated routines for the meal/insulin events.</p><p>This is done using the <code>Analyzer</code> class importable from <code>py_replay_bg.analyzer</code>.</p><p>In the following, we show how to do that in the case of single portions of data and portions of data spanning more than one day (i.e., intervals).</p><h2 id="analyzing-replay-results-from-single-portions-of-data" tabindex="-1"><a class="header-anchor" href="#analyzing-replay-results-from-single-portions-of-data"><span>Analyzing replay results from single portions of data</span></a></h2><p>To analyze replay results from single portions of data use the <code>Analyzer.analyze_replay_results()</code> static method, which is formerly defined as:</p><div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" data-title="python" style="--shiki-dark:#cdd6f4;--shiki-light:#4c4f69;--shiki-dark-bg:#1e1e2e;--shiki-light-bg:#eff1f5;"><pre class="shiki shiki-themes catppuccin-mocha catppuccin-latte vp-code"><code><span class="line"><span style="--shiki-dark:#FAB387;--shiki-dark-font-style:italic;--shiki-light:#FE640B;--shiki-light-font-style:italic;">    @staticmethod</span></span>
<span class="line"><span style="--shiki-dark:#CBA6F7;--shiki-light:#8839EF;">    def</span><span style="--shiki-dark:#89B4FA;--shiki-dark-font-style:italic;--shiki-light:#1E66F5;--shiki-light-font-style:italic;"> analyze_replay_results</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">(</span></span>
<span class="line"><span style="--shiki-dark:#EBA0AC;--shiki-dark-font-style:italic;--shiki-light:#E64553;--shiki-light-font-style:italic;">            replay_results</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">:</span><span style="--shiki-dark:#EBA0AC;--shiki-light:#E64553;"> Dict</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">,</span></span>
<span class="line"><span style="--shiki-dark:#EBA0AC;--shiki-dark-font-style:italic;--shiki-light:#E64553;--shiki-light-font-style:italic;">            data</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">:</span><span style="--shiki-dark:#EBA0AC;--shiki-light:#E64553;"> pd</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">.</span><span style="--shiki-dark:#EBA0AC;--shiki-light:#E64553;">DataFrame </span><span style="--shiki-dark:#94E2D5;--shiki-light:#179299;">=</span><span style="--shiki-dark:#CBA6F7;--shiki-light:#8839EF;"> None</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">,</span></span>
<span class="line"><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">    )</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;"> -&gt;</span><span style="--shiki-dark:#CDD6F4;--shiki-light:#4C4F69;"> Dict</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="input-parameters" tabindex="-1"><a class="header-anchor" href="#input-parameters"><span>Input parameters</span></a></h3><ul><li><code>replay_results</code>: the dictionary returned by or saved with the <code>rbg.replay()</code> method</li><li><code>data</code>, optional, default: <code>None</code>: The <code>data</code> parameter passed to <code>rbg.replay()</code> . If present, the method will also compare the glucose fit vs the data.</li></ul><h3 id="output-parameter" tabindex="-1"><a class="header-anchor" href="#output-parameter"><span>Output parameter</span></a></h3><ul><li><code>analysis</code>: A dictionary containing the results of the analysis with fields <code>median</code>, <code>ci5th</code>, <code>ci25th</code>, <code>ci75th</code>, <code>ci95th</code>, i.e., dictionaries containing the analysis results computed from the median, 5-th percentile, 25-th percentile, 75-th percentile, and 95-th percentiles of the simulated profiles, respectively. Remember that, if the adopted identification method is MAP or <code>n_replay=1</code>, the values contained in <code>median</code>, <code>ci5th</code>, <code>ci25th</code>, <code>ci75th</code>, <code>ci95th</code> coincide. Each dictionary contains: <ul><li><code>glucose</code> and <code>cgm</code>: two dictionaries containing the analysis results computed with AGATA from the simulated <code>glucose</code> and <code>cgm</code> profiles with fields: <ul><li><code>variability</code>: a dictionary containing the following fields (corresponding to glucose variability indices): <ul><li><code>mean_glucose</code>: the average glucose (mg/dl)</li><li><code>median_glucose</code>: the median of glucose (mg/dl)</li><li><code>std_glucose</code>: the glucose standard deviation (mg/dl)</li><li><code>cv_glucose</code>: the glucose coefficient of variation (%)</li><li><code>range_glucose</code>: the spanned glucose range (mg/dl)</li><li><code>iqr_glucose</code>: the glucose interquartile range (mg/dl)</li><li><code>auc_glucose</code>: the area under the glucose curve (mg^2/dl^2)</li><li><code>gmi</code>: the glucose management indicator (-)</li><li><code>cogi</code>: the continuous glucose monitoring index (-)</li><li><code>conga</code>: the CONGA index (-)</li><li><code>j_index</code>: the J-index (-)</li><li><code>mage_plus_index</code>: the positive MAGE index (mg/dl)</li><li><code>mage_minus_index</code>: the negative MAGE index (mg/dl)</li><li><code>mage_index</code>: the overall MAGE index (mg/dl)</li><li><code>ef_index</code>: the EF index (-)</li><li><code>modd</code>: the mean of daily difference (mg/dl)</li><li><code>sddm_index</code>: the standard deviation of daily means (mg/dl)</li><li><code>sdw_index</code>: the within standard deviation (mg/dl)</li><li><code>std_glucose_roc</code>: the standard deviation of glucose rat of change (mg/dl/min)</li><li><code>cvga</code>: the CVGA index (mg^2/dl^2)</li></ul></li><li><code>time_in_ranges</code>: a dictionary containing the following fields (corresponding to time in range indices): <ul><li><code>time_in_target</code>: the time in target (%)</li><li><code>time_in_hypoglycemia</code>: the time in hypoglycemia (%)</li><li><code>time_in_l1_hypoglycemia</code>: the time in level 1 hypoglycemia (%)</li><li><code>time_in_l2_hypoglycemia</code>: the time in level 2 hypoglycemia (%)</li><li><code>time_in_hyperglycemia</code>: the time in hyperglycemia (%)</li><li><code>time_in_l1_hyperglycemia</code>: the time in level 1 hyperglycemia (%)</li><li><code>time_in_l2_hyperglycemia</code>: the time in level 2 hyperglycemia (%)</li></ul></li><li><code>risk</code>: a dictionary containing the following fields (corresponding to glucose risk indices): <ul><li><code>adrr</code>: the average daily risk (-)</li><li><code>lbgi</code>: the low blood glucose index (-)</li><li><code>hbgi</code>: the high blood glucose index (-)</li><li><code>bgri</code>: the blood glucose risk index (-)</li><li><code>gri</code>: the glucose risk indicator (-)</li></ul></li><li><code>glycemic_transformation</code>: a dictionary containing the following fields (corresponding to glucose variability indices which adopt a &quot;scale transformation&quot;): <ul><li><code>grade_score</code>: the overall GRADE score (-)</li><li><code>grade_hypo_score</code>: the hypo GRADE score (-)</li><li><code>grade_hyper_score</code>: the hyper GRADE score (-)</li><li><code>grade_eu_score</code>: the euglycemia GRADE score (-)</li><li><code>igc</code>: the index of glucose control (-)</li><li><code>hypo_index</code>: the hypo index (-)</li><li><code>hyper_index</code>: the hyper index (-)</li><li><code>mr_index</code>: the MR index (-)</li></ul></li><li><code>events</code>: a dictionary containing the following fields (corresponding to glucose adverse events): <ul><li><code>hypoglycemic_events</code>: a dictionary of dictionaries <code>hypo</code>, <code>l1</code>, and <code>l2</code> containing the results of the analysis of hypoglycemic, level 1 hypoglycemic, and level 2 hypoglycemic events, respectively. Each dictionary has fields: <ul><li><code>time_start</code>: a np.ndarray containing the timestamp when each event starts</li><li><code>time_end</code>: a np.ndarray containing the timestamp when each event ends</li><li><code>duration</code>: a np.ndarray containing the duration of each event (min)</li><li><code>mean_duration</code>: the average duration of the events (min)</li><li><code>events_per_week</code>: the frequency per week of the events (#/week)</li></ul></li><li><code>hyperglycemic_events</code>: a dictionary of dictionaries <code>hyper</code>, <code>l1</code>, and <code>l2</code> containing the results of the analysis of hyperglycemic, level 1 hyperglycemic, and level 2 hyperglycemic events, respectively. Each dictionary has fields: <ul><li><code>time_start</code>: a np.ndarray containing the timestamp when each event starts</li><li><code>time_end</code>: a np.ndarray containing the timestamp when each event ends</li><li><code>duration</code>: a np.ndarray containing the duration of each event (min)</li><li><code>mean_duration</code>: the average duration of the events (min)</li><li><code>events_per_week</code>: the frequency per week of the events (#/week)</li></ul></li><li><code>events</code>: a dictionary containing the following fields (corresponding to glucose adverse events):</li><li><code>extended_hypoglycemic_events</code>: a dictionary containing the results of the analysis of extended hypoglycemic events with fields: <ul><li><code>time_start</code>: a np.ndarray containing the timestamp when each event starts</li><li><code>time_end</code>: a np.ndarray containing the timestamp when each event ends</li><li><code>duration</code>: a np.ndarray containing the duration of each event (min)</li><li><code>mean_duration</code>: the average duration of the events (min)</li><li><code>events_per_week</code>: the frequency per week of the events (#/week)</li></ul></li></ul></li><li><code>data_quality</code>: a dictionary containing the following fields (corresponding to data quality): <ul><li><code>number_of_days_of_observation</code>: the length of the profile (days)</li><li><code>missing_glucose_percentage</code>: the percentage of missing glucose data (%)</li></ul></li></ul></li><li><code>events</code>: a dictionary containing the analysis of the simulated meal/insulin events: <ul><li><code>total_insulin</code>: the total amount of injected insulin (U)</li><li><code>total_basal_insulin</code>: the total amount of injected basal insulin (U)</li><li><code>total_bolus_insulin</code>: the total amount of injected bolus insulin (U)</li><li><code>total_correction_bolus_insulin</code>: the total amount of injected correction bolus insulin (U)</li><li><code>total_cho</code>: the total amount of ingested meals (g)</li><li><code>total_hypotreatments</code>: the total amount of ingested hypotreatements (g)</li><li><code>total_meal_announcements</code>: the total amount of announced meals (g)</li><li><code>correction_bolus_insulin_number</code>: the number of correction bolus events (#)</li><li><code>hypotreatment_number</code>: the number of hypotreatment events (#)</li><li><code>exercise_session_number</code>: the number of exercise sessions (#). NOT YET IMPLEMENTED</li></ul></li></ul></li></ul><h3 id="example" tabindex="-1"><a class="header-anchor" href="#example"><span>Example</span></a></h3><div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" data-title="python" style="--shiki-dark:#cdd6f4;--shiki-light:#4c4f69;--shiki-dark-bg:#1e1e2e;--shiki-light-bg:#eff1f5;"><pre class="shiki shiki-themes catppuccin-mocha catppuccin-latte vp-code"><code><span class="line"><span style="--shiki-dark:#6C7086;--shiki-dark-font-style:italic;--shiki-light:#9CA0B0;--shiki-light-font-style:italic;"># Load previously saved results, e.g., ...</span></span>
<span class="line"><span style="--shiki-dark:#CBA6F7;--shiki-light:#8839EF;">with</span><span style="--shiki-dark:#FAB387;--shiki-dark-font-style:italic;--shiki-light:#FE640B;--shiki-light-font-style:italic;"> open</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">(</span><span style="--shiki-dark:#CDD6F4;--shiki-light:#4C4F69;">os</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">.</span><span style="--shiki-dark:#CDD6F4;--shiki-light:#4C4F69;">path</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">.</span><span style="--shiki-dark:#89B4FA;--shiki-light:#1E66F5;">join</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">(</span><span style="--shiki-dark:#CDD6F4;--shiki-light:#4C4F69;">results_folder_location</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">,</span><span style="--shiki-dark:#A6E3A1;--shiki-light:#40A02B;"> &#39;results&#39;</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">,</span><span style="--shiki-dark:#A6E3A1;--shiki-light:#40A02B;"> &#39;workspaces&#39;</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">,</span><span style="--shiki-dark:#A6E3A1;--shiki-light:#40A02B;"> &#39;results.pkl&#39;</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">),</span><span style="--shiki-dark:#A6E3A1;--shiki-light:#40A02B;"> &#39;rb&#39;</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">)</span><span style="--shiki-dark:#CBA6F7;--shiki-light:#8839EF;"> as</span><span style="--shiki-dark:#CDD6F4;--shiki-light:#4C4F69;"> file</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">:</span></span>
<span class="line"><span style="--shiki-dark:#CDD6F4;--shiki-light:#4C4F69;">    replay_results </span><span style="--shiki-dark:#94E2D5;--shiki-light:#179299;">=</span><span style="--shiki-dark:#CDD6F4;--shiki-light:#4C4F69;"> pickle</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">.</span><span style="--shiki-dark:#89B4FA;--shiki-light:#1E66F5;">load</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">(</span><span style="--shiki-dark:#CDD6F4;--shiki-light:#4C4F69;">file</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#6C7086;--shiki-dark-font-style:italic;--shiki-light:#9CA0B0;--shiki-light-font-style:italic;"># Analyze them</span></span>
<span class="line"><span style="--shiki-dark:#CDD6F4;--shiki-light:#4C4F69;">analysis </span><span style="--shiki-dark:#94E2D5;--shiki-light:#179299;">=</span><span style="--shiki-dark:#CDD6F4;--shiki-light:#4C4F69;"> Analyzer</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">.</span><span style="--shiki-dark:#89B4FA;--shiki-light:#1E66F5;">analyze_replay_results</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">(</span><span style="--shiki-dark:#CDD6F4;--shiki-light:#4C4F69;">replay_results</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The full code can be found in <code>/example/code/analysis_example.py</code>.</p><h2 id="analyzing-replay-results-from-portions-of-data-spanning-more-than-one-day-i-e-intervals" tabindex="-1"><a class="header-anchor" href="#analyzing-replay-results-from-portions-of-data-spanning-more-than-one-day-i-e-intervals"><span>Analyzing replay results from portions of data spanning more than one day (i.e., intervals)</span></a></h2><p>To analyze replay results from single portions of data use the <code>Analyzer.analyze_replay_results_interval()</code> static method, which is formerly defined as:</p><div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" data-title="python" style="--shiki-dark:#cdd6f4;--shiki-light:#4c4f69;--shiki-dark-bg:#1e1e2e;--shiki-light-bg:#eff1f5;"><pre class="shiki shiki-themes catppuccin-mocha catppuccin-latte vp-code"><code><span class="line"><span style="--shiki-dark:#FAB387;--shiki-dark-font-style:italic;--shiki-light:#FE640B;--shiki-light-font-style:italic;">    @staticmethod</span></span>
<span class="line"><span style="--shiki-dark:#CBA6F7;--shiki-light:#8839EF;">    def</span><span style="--shiki-dark:#89B4FA;--shiki-dark-font-style:italic;--shiki-light:#1E66F5;--shiki-light-font-style:italic;"> analyze_replay_results_interval</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">(</span></span>
<span class="line"><span style="--shiki-dark:#EBA0AC;--shiki-dark-font-style:italic;--shiki-light:#E64553;--shiki-light-font-style:italic;">            replay_results_interval</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">:</span><span style="--shiki-dark:#FAB387;--shiki-dark-font-style:italic;--shiki-light:#FE640B;--shiki-light-font-style:italic;"> list</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">,</span></span>
<span class="line"><span style="--shiki-dark:#EBA0AC;--shiki-dark-font-style:italic;--shiki-light:#E64553;--shiki-light-font-style:italic;">            data_interval</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">:</span><span style="--shiki-dark:#FAB387;--shiki-dark-font-style:italic;--shiki-light:#FE640B;--shiki-light-font-style:italic;"> list</span><span style="--shiki-dark:#94E2D5;--shiki-light:#179299;"> =</span><span style="--shiki-dark:#CBA6F7;--shiki-light:#8839EF;"> None</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">,</span></span>
<span class="line"><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">    )</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;"> -&gt;</span><span style="--shiki-dark:#CDD6F4;--shiki-light:#4C4F69;"> Dict</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="input-parameters-1" tabindex="-1"><a class="header-anchor" href="#input-parameters-1"><span>Input parameters</span></a></h3><ul><li><code>replay_results_interval</code>: a list of dictionaries returned by or saved with the <code>rbg.replay()</code> method</li><li><code>data_interval</code>, optional, default: <code>None</code>: The list of <code>data</code> passed to <code>rbg.replay()</code> . If present, the method will also compare the glucose fit vs the data.</li></ul><h3 id="output-parameter-1" tabindex="-1"><a class="header-anchor" href="#output-parameter-1"><span>Output parameter</span></a></h3><ul><li><code>analysis</code>: A dictionary containing the results of the analysis with fields <code>median</code>, <code>ci5th</code>, <code>ci25th</code>, <code>ci75th</code>, <code>ci95th</code>, i.e., dictionaries containing the analysis results computed from the median, 5-th percentile, 25-th percentile, 75-th percentile, and 95-th percentiles of the simulated profiles, respectively. Remember that, if the adopted identification method is MAP or <code>n_replay=1</code>, the values contained in <code>median</code>, <code>ci5th</code>, <code>ci25th</code>, <code>ci75th</code>, <code>ci95th</code> coincide. Each dictionary contains: <ul><li><code>glucose</code> and <code>cgm</code>: two dictionaries containing the analysis results computed with AGATA from the simulated <code>glucose</code> and <code>cgm</code> profiles with fields: <ul><li><code>variability</code>: a dictionary containing the following fields (corresponding to glucose variability indices): <ul><li><code>mean_glucose</code>: the average glucose (mg/dl)</li><li><code>median_glucose</code>: the median of glucose (mg/dl)</li><li><code>std_glucose</code>: the glucose standard deviation (mg/dl)</li><li><code>cv_glucose</code>: the glucose coefficient of variation (%)</li><li><code>range_glucose</code>: the spanned glucose range (mg/dl)</li><li><code>iqr_glucose</code>: the glucose interquartile range (mg/dl)</li><li><code>auc_glucose</code>: the area under the glucose curve (mg^2/dl^2)</li><li><code>gmi</code>: the glucose management indicator (-)</li><li><code>cogi</code>: the continuous glucose monitoring index (-)</li><li><code>conga</code>: the CONGA index (-)</li><li><code>j_index</code>: the J-index (-)</li><li><code>mage_plus_index</code>: the positive MAGE index (mg/dl)</li><li><code>mage_minus_index</code>: the negative MAGE index (mg/dl)</li><li><code>mage_index</code>: the overall MAGE index (mg/dl)</li><li><code>ef_index</code>: the EF index (-)</li><li><code>modd</code>: the mean of daily difference (mg/dl)</li><li><code>sddm_index</code>: the standard deviation of daily means (mg/dl)</li><li><code>sdw_index</code>: the within standard deviation (mg/dl)</li><li><code>std_glucose_roc</code>: the standard deviation of glucose rat of change (mg/dl/min)</li><li><code>cvga</code>: the CVGA index (mg^2/dl^2)</li></ul></li><li><code>time_in_ranges</code>: a dictionary containing the following fields (corresponding to time in range indices): <ul><li><code>time_in_target</code>: the time in target (%)</li><li><code>time_in_hypoglycemia</code>: the time in hypoglycemia (%)</li><li><code>time_in_l1_hypoglycemia</code>: the time in level 1 hypoglycemia (%)</li><li><code>time_in_l2_hypoglycemia</code>: the time in level 2 hypoglycemia (%)</li><li><code>time_in_hyperglycemia</code>: the time in hyperglycemia (%)</li><li><code>time_in_l1_hyperglycemia</code>: the time in level 1 hyperglycemia (%)</li><li><code>time_in_l2_hyperglycemia</code>: the time in level 2 hyperglycemia (%)</li></ul></li><li><code>risk</code>: a dictionary containing the following fields (corresponding to glucose risk indices): <ul><li><code>adrr</code>: the average daily risk (-)</li><li><code>lbgi</code>: the low blood glucose index (-)</li><li><code>hbgi</code>: the high blood glucose index (-)</li><li><code>bgri</code>: the blood glucose risk index (-)</li><li><code>gri</code>: the glucose risk indicator (-)</li></ul></li><li><code>glycemic_transformation</code>: a dictionary containing the following fields (corresponding to glucose variability indices which adopt a &quot;scale transformation&quot;): <ul><li><code>grade_score</code>: the overall GRADE score (-)</li><li><code>grade_hypo_score</code>: the hypo GRADE score (-)</li><li><code>grade_hyper_score</code>: the hyper GRADE score (-)</li><li><code>grade_eu_score</code>: the euglycemia GRADE score (-)</li><li><code>igc</code>: the index of glucose control (-)</li><li><code>hypo_index</code>: the hypo index (-)</li><li><code>hyper_index</code>: the hyper index (-)</li><li><code>mr_index</code>: the MR index (-)</li></ul></li><li><code>events</code>: a dictionary containing the following fields (corresponding to glucose adverse events): <ul><li><code>hypoglycemic_events</code>: a dictionary of dictionaries <code>hypo</code>, <code>l1</code>, and <code>l2</code> containing the results of the analysis of hypoglycemic, level 1 hypoglycemic, and level 2 hypoglycemic events, respectively. Each dictionary has fields: <ul><li><code>time_start</code>: a np.ndarray containing the timestamp when each event starts</li><li><code>time_end</code>: a np.ndarray containing the timestamp when each event ends</li><li><code>duration</code>: a np.ndarray containing the duration of each event (min)</li><li><code>mean_duration</code>: the average duration of the events (min)</li><li><code>events_per_week</code>: the frequency per week of the events (#/week)</li></ul></li><li><code>hyperglycemic_events</code>: a dictionary of dictionaries <code>hyper</code>, <code>l1</code>, and <code>l2</code> containing the results of the analysis of hyperglycemic, level 1 hyperglycemic, and level 2 hyperglycemic events, respectively. Each dictionary has fields: <ul><li><code>time_start</code>: a np.ndarray containing the timestamp when each event starts</li><li><code>time_end</code>: a np.ndarray containing the timestamp when each event ends</li><li><code>duration</code>: a np.ndarray containing the duration of each event (min)</li><li><code>mean_duration</code>: the average duration of the events (min)</li><li><code>events_per_week</code>: the frequency per week of the events (#/week)</li></ul></li><li><code>events</code>: a dictionary containing the following fields (corresponding to glucose adverse events):</li><li><code>extended_hypoglycemic_events</code>: a dictionary containing the results of the analysis of extended hypoglycemic events with fields: <ul><li><code>time_start</code>: a np.ndarray containing the timestamp when each event starts</li><li><code>time_end</code>: a np.ndarray containing the timestamp when each event ends</li><li><code>duration</code>: a np.ndarray containing the duration of each event (min)</li><li><code>mean_duration</code>: the average duration of the events (min)</li><li><code>events_per_week</code>: the frequency per week of the events (#/week)</li></ul></li></ul></li><li><code>data_quality</code>: a dictionary containing the following fields (corresponding to data quality): <ul><li><code>number_of_days_of_observation</code>: the length of the profile (days)</li><li><code>missing_glucose_percentage</code>: the percentage of missing glucose data (%)</li></ul></li></ul></li><li><code>events</code>: a dictionary containing the analysis of the simulated meal/insulin events: <ul><li><code>total_insulin</code>: the total amount of injected insulin (U)</li><li><code>total_basal_insulin</code>: the total amount of injected basal insulin (U)</li><li><code>total_bolus_insulin</code>: the total amount of injected bolus insulin (U)</li><li><code>total_correction_bolus_insulin</code>: the total amount of injected correction bolus insulin (U)</li><li><code>total_cho</code>: the total amount of ingested meals (g)</li><li><code>total_hypotreatments</code>: the total amount of ingested hypotreatements (g)</li><li><code>total_meal_announcements</code>: the total amount of announced meals (g)</li><li><code>correction_bolus_insulin_number</code>: the number of correction bolus events (#)</li><li><code>hypotreatment_number</code>: the number of hypotreatment events (#)</li><li><code>exercise_session_number</code>: the number of exercise sessions (#). NOT YET IMPLEMENTED</li></ul></li></ul></li></ul><h3 id="example-1" tabindex="-1"><a class="header-anchor" href="#example-1"><span>Example</span></a></h3><div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" data-title="python" style="--shiki-dark:#cdd6f4;--shiki-light:#4c4f69;--shiki-dark-bg:#1e1e2e;--shiki-light-bg:#eff1f5;"><pre class="shiki shiki-themes catppuccin-mocha catppuccin-latte vp-code"><code><span class="line"><span style="--shiki-dark:#6C7086;--shiki-dark-font-style:italic;--shiki-light:#9CA0B0;--shiki-light-font-style:italic;"># Initialize results list</span></span>
<span class="line"><span style="--shiki-dark:#CDD6F4;--shiki-light:#4C4F69;">replay_results_interval </span><span style="--shiki-dark:#94E2D5;--shiki-light:#179299;">=</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;"> []</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#6C7086;--shiki-dark-font-style:italic;--shiki-light:#9CA0B0;--shiki-light-font-style:italic;"># Load previously saved results, e.g., ...</span></span>
<span class="line"><span style="--shiki-dark:#CBA6F7;--shiki-light:#8839EF;">for</span><span style="--shiki-dark:#CDD6F4;--shiki-light:#4C4F69;"> day </span><span style="--shiki-dark:#CBA6F7;--shiki-light:#8839EF;">in</span><span style="--shiki-dark:#FAB387;--shiki-dark-font-style:italic;--shiki-light:#FE640B;--shiki-light-font-style:italic;"> range</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">(</span><span style="--shiki-dark:#CDD6F4;--shiki-light:#4C4F69;">start_day</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">,</span><span style="--shiki-dark:#CDD6F4;--shiki-light:#4C4F69;"> end_day</span><span style="--shiki-dark:#94E2D5;--shiki-light:#179299;">+</span><span style="--shiki-dark:#FAB387;--shiki-light:#FE640B;">1</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">):</span></span>
<span class="line"><span style="--shiki-dark:#CBA6F7;--shiki-light:#8839EF;">    with</span><span style="--shiki-dark:#FAB387;--shiki-dark-font-style:italic;--shiki-light:#FE640B;--shiki-light-font-style:italic;"> open</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">(</span><span style="--shiki-dark:#CDD6F4;--shiki-light:#4C4F69;">os</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">.</span><span style="--shiki-dark:#CDD6F4;--shiki-light:#4C4F69;">path</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">.</span><span style="--shiki-dark:#89B4FA;--shiki-light:#1E66F5;">join</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">(</span><span style="--shiki-dark:#CDD6F4;--shiki-light:#4C4F69;">results_folder_location</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">,</span><span style="--shiki-dark:#A6E3A1;--shiki-light:#40A02B;"> &#39;results&#39;</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">,</span><span style="--shiki-dark:#A6E3A1;--shiki-light:#40A02B;"> &#39;workspaces&#39;</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">,</span><span style="--shiki-dark:#A6E3A1;--shiki-light:#40A02B;"> &#39;results_&#39;</span><span style="--shiki-dark:#94E2D5;--shiki-light:#179299;"> +</span><span style="--shiki-dark:#FAB387;--shiki-dark-font-style:italic;--shiki-light:#FE640B;--shiki-light-font-style:italic;"> str</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">(</span><span style="--shiki-dark:#CDD6F4;--shiki-light:#4C4F69;">day</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">)</span><span style="--shiki-dark:#94E2D5;--shiki-light:#179299;"> +</span><span style="--shiki-dark:#A6E3A1;--shiki-light:#40A02B;"> &#39;.pkl&#39;</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">),</span><span style="--shiki-dark:#A6E3A1;--shiki-light:#40A02B;"> &#39;rb&#39;</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">)</span><span style="--shiki-dark:#CBA6F7;--shiki-light:#8839EF;"> as</span><span style="--shiki-dark:#CDD6F4;--shiki-light:#4C4F69;"> file</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">:</span></span>
<span class="line"><span style="--shiki-dark:#CDD6F4;--shiki-light:#4C4F69;">        replay_results </span><span style="--shiki-dark:#94E2D5;--shiki-light:#179299;">=</span><span style="--shiki-dark:#CDD6F4;--shiki-light:#4C4F69;"> pickle</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">.</span><span style="--shiki-dark:#89B4FA;--shiki-light:#1E66F5;">load</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">(</span><span style="--shiki-dark:#CDD6F4;--shiki-light:#4C4F69;">file</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">)</span></span>
<span class="line"><span style="--shiki-dark:#CDD6F4;--shiki-light:#4C4F69;">    replay_results_interval</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">.</span><span style="--shiki-dark:#89B4FA;--shiki-light:#1E66F5;">append</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">(</span><span style="--shiki-dark:#CDD6F4;--shiki-light:#4C4F69;">replay_results</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#6C7086;--shiki-dark-font-style:italic;--shiki-light:#9CA0B0;--shiki-light-font-style:italic;"># Analyze them</span></span>
<span class="line"><span style="--shiki-dark:#CDD6F4;--shiki-light:#4C4F69;">analysis </span><span style="--shiki-dark:#94E2D5;--shiki-light:#179299;">=</span><span style="--shiki-dark:#CDD6F4;--shiki-light:#4C4F69;"> Analyzer</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">.</span><span style="--shiki-dark:#89B4FA;--shiki-light:#1E66F5;">analyze_replay_results_interval</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">(</span><span style="--shiki-dark:#EBA0AC;--shiki-dark-font-style:italic;--shiki-light:#E64553;--shiki-light-font-style:italic;">replay_results_interval</span><span style="--shiki-dark:#94E2D5;--shiki-light:#179299;">=</span><span style="--shiki-dark:#CDD6F4;--shiki-light:#4C4F69;">replay_results_interval</span><span style="--shiki-dark:#9399B2;--shiki-light:#7C7F93;">)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The full code can be found in <code>/example/code/analysis_example_intervals.py</code>.</p>`,24)]))}const h=e(t,[["render",n],["__file","analyzing_replay_results.html.vue"]]),r=JSON.parse('{"path":"/documentation/analyzing_replay_results.html","title":"Analyzing replay results","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"Analyzing replay results from single portions of data","slug":"analyzing-replay-results-from-single-portions-of-data","link":"#analyzing-replay-results-from-single-portions-of-data","children":[{"level":3,"title":"Input parameters","slug":"input-parameters","link":"#input-parameters","children":[]},{"level":3,"title":"Output parameter","slug":"output-parameter","link":"#output-parameter","children":[]},{"level":3,"title":"Example","slug":"example","link":"#example","children":[]}]},{"level":2,"title":"Analyzing replay results from portions of data spanning more than one day (i.e., intervals)","slug":"analyzing-replay-results-from-portions-of-data-spanning-more-than-one-day-i-e-intervals","link":"#analyzing-replay-results-from-portions-of-data-spanning-more-than-one-day-i-e-intervals","children":[{"level":3,"title":"Input parameters","slug":"input-parameters-1","link":"#input-parameters-1","children":[]},{"level":3,"title":"Output parameter","slug":"output-parameter-1","link":"#output-parameter-1","children":[]},{"level":3,"title":"Example","slug":"example-1","link":"#example-1","children":[]}]}],"git":{"createdTime":1732546835000,"updatedTime":1733820853000,"contributors":[{"name":"Giacomo Cappon","username":"Giacomo Cappon","email":"cappongiacomo@gmail.com","commits":4,"url":"https://github.com/Giacomo Cappon"}]},"readingTime":{"minutes":6.02,"words":1805},"filePathRelative":"documentation/analyzing_replay_results.md","localizedDate":"November 25, 2024"}');export{h as comp,r as data};
