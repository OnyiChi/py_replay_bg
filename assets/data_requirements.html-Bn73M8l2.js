import{_ as r,c as a,a as o,b as t,e as i,d as s,w as d,r as c,o as n}from"./app-D4J3UBtE.js";const u={},m={class:"hint-container warning"},p={class:"MathJax",jax:"SVG",style:{position:"relative"}},h={style:{"vertical-align":"-0.439ex"},xmlns:"http://www.w3.org/2000/svg",width:"1.281ex",height:"2.034ex",role:"img",focusable:"false",viewBox:"0 -705 566 899","aria-hidden":"true"},g={class:"MathJax",jax:"SVG",style:{position:"relative"}},b={style:{"vertical-align":"-0.667ex"},xmlns:"http://www.w3.org/2000/svg",width:"3.969ex",height:"2.256ex",role:"img",focusable:"false",viewBox:"0 -702 1754.5 997","aria-hidden":"true"},f={class:"hint-container tip"};function T(Q,e){const l=c("RouteLink");return n(),a("div",null,[e[22]||(e[22]=o('<h1 id="data-requirements" tabindex="-1"><a class="header-anchor" href="#data-requirements"><span>Data Requirements</span></a></h1><p>Data provided to ReplayBG must comply to strict format requirements and should be selected following some best practices.</p><h2 id="format-requirements" tabindex="-1"><a class="header-anchor" href="#format-requirements"><span>Format requirements</span></a></h2><p>Format requirements depend on the selected <code>blueprint</code>, i.e., single-meal or multi-meal, as such, in the following, details about these aspects are presented for each possible blueprint separately.</p><h3 id="single-meal-blueprint" tabindex="-1"><a class="header-anchor" href="#single-meal-blueprint"><span>Single Meal blueprint</span></a></h3><p>By &quot;single meal&quot; one can refer to a specific period of time when a specific subject had only 1 main meal and a corresponding insulin basal-bolus administration. Usually, this period of time spans maximum 6/8 hours, starts near such main meal, and ends just before the subsequent main meal and/or after a reasonable amount of time.</p><p><code>data</code> must be saved in a <code>.csv</code> file and contain the following columns:</p><ul><li><code>t</code>: the timestamps when data of the corresponding row were recorded (format <code>DD-MMM-YYYY HH:mm:SS</code> for example <code>20-Dec-2013 10:35:00</code>). The sampling grid defined by the <code>t</code> column must be homogeneous, e.g., have a datapoint every 5 minutes.</li><li><code>glucose</code>: the glucose concentration (mg/dl) at <code>t</code>. Can contain NaN values.</li><li><code>cho</code>: the meal intake (g/min) at <code>t</code>. Can&#39;t contain NaN values. If no meals were recorded at <code>t</code> just put <code>0</code> there.</li><li><code>bolus</code>: the insulin bolus (U/min) administered at <code>t</code>. Can&#39;t contain NaN values. If no insulin boluses were administered at <code>t</code> just put <code>0</code> there.</li><li><code>basal</code>: the basal insulin (U/min) administered at <code>t</code>. Can&#39;t contain NaN values. If no basal insulin was administered at <code>t</code> just put <code>0</code> there.</li><li><code>bolus_label</code>: the type of <code>bolus</code> at time <code>t</code>. This column Each <code>bolus</code> entry &gt; 0 must have a label defined. Can be <ul><li><code>B</code> if it is the bolus of a breakfast.</li><li><code>L</code> if it is the bolus of a lunch.</li><li><code>D</code> if it is the bolus of a dinner.</li><li><code>C</code> if it is a corrective bolus.</li><li><code>S</code> if it is the bolus of a snack.</li></ul></li></ul><p>If other columns are present in your data file, they will be ignored.</p><div class="hint-container tip"><p class="hint-container-title">NOTE</p><p>The total length of the simulation, <code>simulation_length</code>, is defined in minutes and determined by ReplayBG automatically using the <code>t</code> column of <code>data</code> and the <code>yts</code> input parameter provided to the <code>ReplayBG</code> object builder.</p><p>For example, if <code>yts</code> is <code>5</code> minutes and <code>t</code> starts from <code>20-Dec-2013 10:36:00</code> and ends to <code>20-Dec-2013 10:46:00</code>, then <code>simulation_length</code> will be <code>10</code>.</p></div><div class="hint-container tip"><p class="hint-container-title">Tips</p><p>If <code>bolus_label</code> is not important for you (e.g., you do not plan to use it during replay) or if you do not need that, just add an empty <code>bolus_label</code> column.</p></div>',11)),t("div",m,[e[6]||(e[6]=t("p",{class:"hint-container-title"},"Warning",-1)),t("p",null,[e[2]||(e[2]=i('If more than 1 meal are present in the provided file, ReplayBG will consider the first meal as "main" meal. The others will be considered as "other" meals. The resulting ')),e[3]||(e[3]=t("code",null,"kabs",-1)),e[4]||(e[4]=i(" and ")),t("mjx-container",p,[(n(),a("svg",h,e[0]||(e[0]=[t("g",{stroke:"currentColor",fill:"currentColor","stroke-width":"0",transform:"scale(1,-1)"},[t("g",{"data-mml-node":"math"},[t("g",{"data-mml-node":"mi"},[t("path",{"data-c":"1D6FD",d:"M29 -194Q23 -188 23 -186Q23 -183 102 134T186 465Q208 533 243 584T309 658Q365 705 429 705H431Q493 705 533 667T573 570Q573 465 469 396L482 383Q533 332 533 252Q533 139 448 65T257 -10Q227 -10 203 -2T165 17T143 40T131 59T126 65L62 -188Q60 -194 42 -194H29ZM353 431Q392 431 427 419L432 422Q436 426 439 429T449 439T461 453T472 471T484 495T493 524T501 560Q503 569 503 593Q503 611 502 616Q487 667 426 667Q384 667 347 643T286 582T247 514T224 455Q219 439 186 308T152 168Q151 163 151 147Q151 99 173 68Q204 26 260 26Q302 26 349 51T425 137Q441 171 449 214T457 279Q457 337 422 372Q380 358 347 358H337Q258 358 258 389Q258 396 261 403Q275 431 353 431Z"})])])],-1)]))),e[1]||(e[1]=t("mjx-assistive-mml",{unselectable:"on",display:"inline"},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("mi",null,"β")])],-1))]),e[5]||(e[5]=i(" parameters will be unique so their value will depend by ALL the meals you have on your data. SO, it is really not advised to have more than one meal when using the single-meal blueprint."))])]),e[23]||(e[23]=o('<h4 id="requirements-during-replay" tabindex="-1"><a class="header-anchor" href="#requirements-during-replay"><span>Requirements during replay</span></a></h4><p>When replaying (using the <code>replay</code> method), the following requirements are no more valid under the following circumstances:</p><ul><li><code>glucose</code>: during replay this is simply ignored.</li><li><code>cho</code>: if <code>cho_source</code> is <code>generated</code> since the CHO event will be generated by the provided handler during the replay simulation.</li><li><code>bolus</code> and <code>bolus_label</code>: if <code>bolus_source</code> is <code>dss</code> since the insulin bolus events will be generated by the provided handler during the replay simulation.</li><li><code>basal</code>: if <code>basal_source</code> is <code>dss</code> since the basal insulin will be generated by the provided handler during the replay simulation.</li></ul><h3 id="multi-meal-blueprint" tabindex="-1"><a class="header-anchor" href="#multi-meal-blueprint"><span>Multi Meal blueprint</span></a></h3><p>By &quot;multi meal&quot; one can refer to a specific period of time when a specific subject had more than 1 main meal and a corresponding insulin basal-bolus administration regimen. One can think to such period of time by thinking to a day, when multiple meals occur, or even multiple days.</p><p><code>data</code> must be saved in a <code>.csv</code> file and contain (at least) the following columns:</p><ul><li><code>t</code>: the timestamps when data of the corresponding row were recorded (format <code>DD-MMM-YYYY HH:mm:SS</code> for example <code>20-Dec-2013 10:35:00</code>). The sampling grid defined by the <code>t</code> column must be homogeneous.</li><li><code>glucose</code>: the glucose concentration (mg/dl) at <code>t</code>. Can contain NaN values.</li><li><code>cho</code>: the meal intake (g/min) at <code>t</code>. Can&#39;t contain NaN values. If no meals were recorded at <code>t</code> just put <code>0</code> there.</li><li><code>bolus</code>: the insulin bolus (U/min) administered at <code>t</code>. Can&#39;t contain NaN values. If no insulin boluses were administered at <code>t</code> just put <code>0</code> there.</li><li><code>basal</code>: the basal insulin (U/min) administered at <code>t</code>. Can&#39;t contain NaN values. If no basal insulin was administered at <code>t</code> just put <code>0</code> there.</li><li><code>cho_label</code>: the type of <code>cho</code> at time <code>t</code>. Each <code>cho</code> entry &gt; 0 must have a label defined. Can be <ul><li><code>B</code> if it is a breakfast.</li><li><code>L</code> if it is a lunch.</li><li><code>D</code> if it is a dinner.</li><li><code>H</code> if it is a hypotreatment.</li><li><code>S</code> if it is a snack.</li></ul></li><li><code>bolus_label</code>: the type of <code>bolus</code> at time <code>t</code>. Each <code>bolus</code> entry &gt; 0 must have a label defined. Can be <ul><li><code>B</code> if it is the bolus of a breakfast.</li><li><code>L</code> if it is the bolus of a lunch.</li><li><code>D</code> if it is the bolus of a dinner.</li><li><code>C</code> if it is a corrective bolus.</li><li><code>S</code> if it is the bolus of a snack.</li></ul></li></ul><p>If other columns are present in your data file, they will be ignored.</p><div class="hint-container warning"><p class="hint-container-title">Warning</p><p>The <code>cho</code> and <code>bolus</code> columns must contain at least one event when twinning.</p></div><div class="hint-container tip"><p class="hint-container-title">Tips</p><p>If <code>bolus_label</code> is not important for you (e.g., you do not plan to use it during replay) or if you do not need that, just add an empty <code>bolus_label</code> column.</p></div><div class="hint-container tip"><p class="hint-container-title">Tips</p><p>A representative data file of a single meal blueprint can be found in <code>example/data/multi-meal_example.csv</code></p></div><h4 id="requirements-during-replay-1" tabindex="-1"><a class="header-anchor" href="#requirements-during-replay-1"><span>Requirements during replay</span></a></h4><p>When replaying (using the <code>replay</code> method), the following requirements are no more valid under the following circumstances:</p><ul><li><code>glucose</code>: during replay this is simply ignored.</li><li><code>cho</code> and <code>cho_label</code>: if <code>cho_source</code> is <code>generated</code> since the CHO events will be generated by the provided handler during the replay simulation.</li><li><code>bolus</code> and <code>bolus_label</code>: if <code>bolus_source</code> is <code>dss</code> since the insulin bolus events will be generated by the provided handler during the replay simulation.</li><li><code>basal</code>: if <code>basal_source</code> is <code>dss</code> since the basal insulin will be generated by the provided handler during the replay simulation.</li></ul><h2 id="best-practices" tabindex="-1"><a class="header-anchor" href="#best-practices"><span>Best practices</span></a></h2><p>The potential ReplayBG user should be aware of several practical aspects and be careful when selecting the portion of data to work with. Here&#39;s the details.</p><h3 id="starting-point" tabindex="-1"><a class="header-anchor" href="#starting-point"><span>Starting point</span></a></h3>',17)),t("p",null,[e[9]||(e[9]=i("The twinning procedure of ReplayBG does not estimate the states of the blueprint mathematical model and, more importantly, the corresponding initial conditions. Identifying such initial conditions is crucial to correctly estimating the unknown model parameter vector ")),t("mjx-container",g,[(n(),a("svg",b,e[7]||(e[7]=[o('<g stroke="currentColor" fill="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="msub"><g data-mml-node="mi"><path data-c="1D73D" d="M213 -8Q130 -8 85 50T40 200V207Q40 303 83 428Q122 535 189 608Q279 702 381 702Q410 702 437 693T492 661T537 593T554 486Q554 428 539 362T495 230T425 111T330 25T213 -8ZM433 562Q433 600 419 625T377 651Q363 651 348 644T311 619T268 557T229 453Q225 441 217 411T208 378H401Q433 500 433 562ZM161 140Q161 43 217 43Q249 43 280 74Q310 103 332 150T378 287Q385 313 385 315Q385 316 289 316H192Q191 308 183 275T169 205T161 140Z"></path></g><g data-mml-node="TeXAtom" transform="translate(595,-150) scale(0.707)" data-mjx-texclass="ORD"><g data-mml-node="mi"><path data-c="1D45D" d="M23 287Q24 290 25 295T30 317T40 348T55 381T75 411T101 433T134 442Q209 442 230 378L240 387Q302 442 358 442Q423 442 460 395T497 281Q497 173 421 82T249 -10Q227 -10 210 -4Q199 1 187 11T168 28L161 36Q160 35 139 -51T118 -138Q118 -144 126 -145T163 -148H188Q194 -155 194 -157T191 -175Q188 -187 185 -190T172 -194Q170 -194 161 -194T127 -193T65 -192Q-5 -192 -24 -194H-32Q-39 -187 -39 -183Q-37 -156 -26 -148H-6Q28 -147 33 -136Q36 -130 94 103T155 350Q156 355 156 364Q156 405 131 405Q109 405 94 377T71 316T59 280Q57 278 43 278H29Q23 284 23 287ZM178 102Q200 26 252 26Q282 26 310 49T356 107Q374 141 392 215T411 325V331Q411 405 350 405Q339 405 328 402T306 393T286 380T269 365T254 350T243 336T235 326L232 322Q232 321 229 308T218 264T204 212Q178 106 178 102Z"></path></g><g data-mml-node="mi" transform="translate(503,0)"><path data-c="210E" d="M137 683Q138 683 209 688T282 694Q294 694 294 685Q294 674 258 534Q220 386 220 383Q220 381 227 388Q288 442 357 442Q411 442 444 415T478 336Q478 285 440 178T402 50Q403 36 407 31T422 26Q450 26 474 56T513 138Q516 149 519 151T535 153Q555 153 555 145Q555 144 551 130Q535 71 500 33Q466 -10 419 -10H414Q367 -10 346 17T325 74Q325 90 361 192T398 345Q398 404 354 404H349Q266 404 205 306L198 293L164 158Q132 28 127 16Q114 -11 83 -11Q69 -11 59 -2T48 16Q48 30 121 320L195 616Q195 629 188 632T149 637H128Q122 643 122 645T124 664Q129 683 137 683Z"></path></g><g data-mml-node="mi" transform="translate(1079,0)"><path data-c="1D466" d="M21 287Q21 301 36 335T84 406T158 442Q199 442 224 419T250 355Q248 336 247 334Q247 331 231 288T198 191T182 105Q182 62 196 45T238 27Q261 27 281 38T312 61T339 94Q339 95 344 114T358 173T377 247Q415 397 419 404Q432 431 462 431Q475 431 483 424T494 412T496 403Q496 390 447 193T391 -23Q363 -106 294 -155T156 -205Q111 -205 77 -183T43 -117Q43 -95 50 -80T69 -58T89 -48T106 -45Q150 -45 150 -87Q150 -107 138 -122T115 -142T102 -147L99 -148Q101 -153 118 -160T152 -167H160Q177 -167 186 -165Q219 -156 247 -127T290 -65T313 -9T321 21L315 17Q309 13 296 6T270 -6Q250 -11 231 -11Q185 -11 150 11T104 82Q103 89 103 113Q103 170 138 262T173 379Q173 380 173 381Q173 390 173 393T169 400T158 404H154Q131 404 112 385T82 344T65 302T57 280Q55 278 41 278H27Q21 284 21 287Z"></path></g></g></g></g></g>',1)]))),e[8]||(e[8]=t("mjx-assistive-mml",{unselectable:"on",display:"inline"},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("msub",null,[t("mi",{mathvariant:"bold-italic"},"θ"),t("mrow",{"data-mjx-texclass":"ORD"},[t("mi",null,"p"),t("mi",null,"h"),t("mi",null,"y")])])])],-1))]),e[10]||(e[10]=i(" and, by product, reliably replaying the glucose profile with new, altered, inputs. To circumvent this issue, ReplayBG assumes all model state initial conditions at steady state. This assumption is granted to be valid when the actions of exogenous insulin and carbohydrate intake are “exhausted”, i.e., when the starting point of the portion of data is reasonably distant from the last meal and insulin boluses, e.g., 4 hours."))]),t("div",f,[e[20]||(e[20]=t("p",{class:"hint-container-title"},"Tips",-1)),e[21]||(e[21]=t("p",null,[i("When twinning and replaying intervals (using the "),t("code",null,"twin"),i(" and the "),t("code",null,"replay"),i(" methods, respectively) instead of single portions of data, things change. Indeed, the problem of the starting point applies only to the first portion where we must assume initial steady state conditions. The other subsequent portions will start from the immediate next datapoint with initial conditions defined by "),t("code",null,"x0"),i(" and "),t("code",null,"previous_data_name"),i(".")],-1)),t("p",null,[e[13]||(e[13]=i("For more information on the ")),e[14]||(e[14]=t("code",null,"x0",-1)),e[15]||(e[15]=i(" and ")),e[16]||(e[16]=t("code",null,"previous_data_name",-1)),e[17]||(e[17]=i(" parameters when twinning and replaying please refer to the ")),s(l,{to:"/documentation/twinning_procedure.html"},{default:d(()=>e[11]||(e[11]=[i("Twinning Procedure")])),_:1}),e[18]||(e[18]=i(" and the ")),s(l,{to:"/documentation/replaying.html"},{default:d(()=>e[12]||(e[12]=[i("Replaying")])),_:1}),e[19]||(e[19]=i(" pages."))])]),e[24]||(e[24]=t("h3",{id:"minimum-data-length",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#minimum-data-length"},[t("span",null,"Minimum data length")])],-1)),e[25]||(e[25]=t("p",null,"As a rule of thumb we suggest to use portions of data that span at least 6 hours. As demonstrated in the literature, this ensures to obtain better parameter estimates and simulation results.",-1)),e[26]||(e[26]=t("h3",{id:"data-gaps",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#data-gaps"},[t("span",null,"Data gaps")])],-1)),e[27]||(e[27]=t("p",null,"To make the twinning procedure more reliable, data portions having significant data gaps (i.e., more that 10% of missing glucose readings) or without a single reported meal intake or insulin bolus, should be discarded to avoid the creation of digital twins not representing the actual underneath physiology.",-1))])}const w=r(u,[["render",T],["__file","data_requirements.html.vue"]]),v=JSON.parse('{"path":"/documentation/data_requirements.html","title":"Data Requirements","lang":"en-US","frontmatter":{"sidebar":"heading"},"headers":[{"level":2,"title":"Format requirements","slug":"format-requirements","link":"#format-requirements","children":[{"level":3,"title":"Single Meal blueprint","slug":"single-meal-blueprint","link":"#single-meal-blueprint","children":[]},{"level":3,"title":"Multi Meal blueprint","slug":"multi-meal-blueprint","link":"#multi-meal-blueprint","children":[]}]},{"level":2,"title":"Best practices","slug":"best-practices","link":"#best-practices","children":[{"level":3,"title":"Starting point","slug":"starting-point","link":"#starting-point","children":[]},{"level":3,"title":"Minimum data length","slug":"minimum-data-length","link":"#minimum-data-length","children":[]},{"level":3,"title":"Data gaps","slug":"data-gaps","link":"#data-gaps","children":[]}]}],"git":{"updatedTime":1733820853000,"contributors":[{"name":"Giacomo Cappon","email":"cappongiacomo@gmail.com","commits":6,"url":"https://github.com/Giacomo Cappon"}]},"filePathRelative":"documentation/data_requirements.md"}');export{w as comp,v as data};
