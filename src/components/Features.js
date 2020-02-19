import React, { Component } from 'react'

class Features extends Component {
  render () {
    return (<div className="features">

      <div class="tl bt b--black-10 pa3 pa5-ns bg-lightest-blue navy code" id="principles">
        <div class="mw9 center">
          <h3 className="f1 center tc">Features</h3>
          {/* <h1 class="f5 ttu tracked fw6">Principles</h1> */}
          <section class="lh-copy">
            <div class="cf">
              <article class="fl pv2 w-100 w-third-l pr4-l">
                <h2 class="f5 f4-ns fw6 mb0">Transfers</h2>
                <p class="f6 f5-ns measure lh-copy mt0">
                      Account to Account transfers!
                </p>
              </article>
              <article class="pv2 fl w-100 w-third-l ph3-l">
                <h2 class="f5 f4-ns fw6 mb0">Instant Deposits</h2>
                <p class="f6 f5-ns measure lh-copy mt0">
                      We offer instant deposits on your funds!
                </p>
              </article>
              <article class="pv2 fl w-100 w-third-l pl4-l">
                <h2 class="f5 f4-ns  fw6 mb0">
                      Smooth Withdrawals
                </h2>
                <p class="f6 f5-ns measure lh-copy mt0">
                      Fastest withdrawals
                </p>
              </article>
            </div>
            <div class="cf w-100">
              <article class="pv2 fl w-100 w-third-l pl0 pr4-l">
                <h2 class="f5 f4-ns fw6 mb0">Checking & Savings</h2>
                <p class="f6 f5-ns measure lh-copy mt0">
                     We offer both Checking & Savings Accounts!
                </p>
              </article>
              <article class="pv2 fl w-100 w-third-l ph3-l">
                <h2 class="f5 f4-ns  fw6 mb0">Order Flow</h2>
                <p class="f6 f5-ns measure lh-copy mt0">
                      Analyse buying and selling pressure, market microstructure and affect on position size
                </p>
              </article>
              <article class="pv2 fl w-100 w-third-l pl4-l">
                <h2 class="f5 f4-ns fw6 mb0">
                      Supp
                </h2>
                <p class="f6 f5-ns measure lh-copy mt0">
                      Clear documentation helps create a shared understanding of design patterns amongst your team.
                      This helps promote reuse and reduces the amount of redundancy in a codebase.
                </p>
              </article>
            </div>
          </section>
        </div>
      </div>
    </div>)
  }
}

export default Features
