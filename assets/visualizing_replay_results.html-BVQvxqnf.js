import{_ as a,c as n,a as e,o as t}from"./app-D4J3UBtE.js";const l={};function p(i,s){return t(),n("div",null,s[0]||(s[0]=[e(`<h1 id="visualizing-replay-results" tabindex="-1"><a class="header-anchor" href="#visualizing-replay-results"><span>Visualizing replay results</span></a></h1><p>ReplayBG provides the possibility, to visualize in a painless way the results of <code>rbg.replay()</code>.</p><p>This is done using the <code>Visualizer</code> class importable from <code>py_replay_bg.visualizer</code>.</p><p>In the following, we show how to do that in the case of single portions of data and portions of data spanning more than one day (i.e., intervals).</p><h2 id="visualizing-replay-results-from-single-portions-of-data" tabindex="-1"><a class="header-anchor" href="#visualizing-replay-results-from-single-portions-of-data"><span>Visualizing replay results from single portions of data</span></a></h2><p>To visualize replay results from single portions of data use the <code>Visualizer.plot_replay_results()</code> static method, which is formerly defined as:</p><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre><code><span class="line">    <span class="token decorator annotation punctuation">@staticmethod</span></span>
<span class="line">    <span class="token keyword">def</span> <span class="token function">plot_replay_results</span><span class="token punctuation">(</span></span>
<span class="line">            replay_results<span class="token punctuation">:</span> Dict<span class="token punctuation">,</span></span>
<span class="line">            data<span class="token punctuation">:</span> pd<span class="token punctuation">.</span>DataFrame <span class="token operator">=</span> <span class="token boolean">None</span><span class="token punctuation">,</span></span>
<span class="line">            title<span class="token punctuation">:</span> <span class="token builtin">str</span> <span class="token operator">=</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="input-parameters" tabindex="-1"><a class="header-anchor" href="#input-parameters"><span>Input parameters</span></a></h3><ul><li><code>replay_results</code>: the dictionary returned by or saved with the <code>rbg.replay()</code> method</li><li><code>data</code>, optional, default: <code>None</code>: The <code>data</code> parameter passed to <code>rbg.replay()</code> . If present, the method will also compare the glucose fit vs the data.</li><li><code>title</code>, optional, default: <code>None</code>: A string with an optional title to be added to the figure.</li></ul><h3 id="example" tabindex="-1"><a class="header-anchor" href="#example"><span>Example</span></a></h3><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre><code><span class="line"><span class="token comment"># Load previously saved results, e.g., ...</span></span>
<span class="line"><span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>results_folder_location<span class="token punctuation">,</span> <span class="token string">&#39;results&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;workspaces&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;results.pkl&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&#39;rb&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token builtin">file</span><span class="token punctuation">:</span></span>
<span class="line">    replay_results <span class="token operator">=</span> pickle<span class="token punctuation">.</span>load<span class="token punctuation">(</span><span class="token builtin">file</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Analyze them</span></span>
<span class="line">Visualizer<span class="token punctuation">.</span>plot_replay_results<span class="token punctuation">(</span>replay_results<span class="token operator">=</span>replay_results<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Will produce:</p><p><img src="https://i.postimg.cc/sgV8XCQ8/Figure-2.png" alt="&quot;Visualized results&quot;" title="Visualized results"></p><p>The full code can be found in <code>/example/code/analysis_example.py</code>.</p><h2 id="visualizing-replay-results-from-portions-of-data-spanning-more-than-one-day-i-e-intervals" tabindex="-1"><a class="header-anchor" href="#visualizing-replay-results-from-portions-of-data-spanning-more-than-one-day-i-e-intervals"><span>Visualizing replay results from portions of data spanning more than one day (i.e., intervals)</span></a></h2><p>To visualize replay results from single portions of data use the <code>Visualizer.plot_replay_results_interval()</code> static method, which is formerly defined as:</p><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre><code><span class="line">    <span class="token decorator annotation punctuation">@staticmethod</span></span>
<span class="line">    <span class="token keyword">def</span> <span class="token function">plot_replay_results_interval</span><span class="token punctuation">(</span></span>
<span class="line">            replay_results_interval<span class="token punctuation">:</span> <span class="token builtin">list</span><span class="token punctuation">,</span></span>
<span class="line">            data_interval<span class="token punctuation">:</span> <span class="token builtin">list</span> <span class="token operator">=</span> <span class="token boolean">None</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> Dict</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="input-parameters-1" tabindex="-1"><a class="header-anchor" href="#input-parameters-1"><span>Input parameters</span></a></h3><ul><li><code>replay_results_interval</code>: a list of dictionaries returned by or saved with the <code>rbg.replay()</code> method</li><li><code>data_interval</code>, optional, default: <code>None</code>: The list of <code>data</code> passed to <code>rbg.replay()</code> . If present, the method will also compare the glucose fit vs the data.</li><li><code>title</code>, optional, default: <code>None</code>: A string with an optional title to be added to the figure.</li></ul><h3 id="example-1" tabindex="-1"><a class="header-anchor" href="#example-1"><span>Example</span></a></h3><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre><code><span class="line"><span class="token comment"># Initialize results list</span></span>
<span class="line">replay_results_interval <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Load previously saved results, e.g., ...</span></span>
<span class="line"><span class="token keyword">for</span> day <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>start_day<span class="token punctuation">,</span> end_day<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>results_folder_location<span class="token punctuation">,</span> <span class="token string">&#39;results&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;workspaces&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;results_&#39;</span> <span class="token operator">+</span> <span class="token builtin">str</span><span class="token punctuation">(</span>day<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&#39;.pkl&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&#39;rb&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token builtin">file</span><span class="token punctuation">:</span></span>
<span class="line">        replay_results <span class="token operator">=</span> pickle<span class="token punctuation">.</span>load<span class="token punctuation">(</span><span class="token builtin">file</span><span class="token punctuation">)</span></span>
<span class="line">    replay_results_interval<span class="token punctuation">.</span>append<span class="token punctuation">(</span>replay_results<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Visualize them</span></span>
<span class="line">Visualizer<span class="token punctuation">.</span>plot_replay_results_interval<span class="token punctuation">(</span>replay_results_interval<span class="token operator">=</span>replay_results_interval<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Will produce:</p><p><img src="https://i.postimg.cc/LXqGpkY8/Figure-1.png" alt="&quot;Visualized results&quot;" title="Visualized results"></p><p>The full code can be found in <code>/example/code/analysis_example_intervals.py</code>.</p>`,24)]))}const r=a(l,[["render",p],["__file","visualizing_replay_results.html.vue"]]),c=JSON.parse('{"path":"/documentation/visualizing_replay_results.html","title":"Visualizing replay results","lang":"en-US","frontmatter":{"sidebar":"heading"},"headers":[{"level":2,"title":"Visualizing replay results from single portions of data","slug":"visualizing-replay-results-from-single-portions-of-data","link":"#visualizing-replay-results-from-single-portions-of-data","children":[{"level":3,"title":"Input parameters","slug":"input-parameters","link":"#input-parameters","children":[]},{"level":3,"title":"Example","slug":"example","link":"#example","children":[]}]},{"level":2,"title":"Visualizing replay results from portions of data spanning more than one day (i.e., intervals)","slug":"visualizing-replay-results-from-portions-of-data-spanning-more-than-one-day-i-e-intervals","link":"#visualizing-replay-results-from-portions-of-data-spanning-more-than-one-day-i-e-intervals","children":[{"level":3,"title":"Input parameters","slug":"input-parameters-1","link":"#input-parameters-1","children":[]},{"level":3,"title":"Example","slug":"example-1","link":"#example-1","children":[]}]}],"git":{"updatedTime":1733820853000,"contributors":[{"name":"Giacomo Cappon","email":"cappongiacomo@gmail.com","commits":4,"url":"https://github.com/Giacomo Cappon"}]},"filePathRelative":"documentation/visualizing_replay_results.md"}');export{r as comp,c as data};
