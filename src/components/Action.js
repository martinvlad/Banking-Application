import React, { Component } from 'react'
import axios from 'axios'
import Select from 'react-select'

class Action extends Component {
  constructor (props) {
    super(props)
    this.state = {
      from: '',
      to: '',
      amount: null,
      fromBalance: 'CHECKING',
      toBalance: 'CHECKING'
    }
  }
  onChange = ({ target }) => {
    let state = this.state
    state[target.name] = target.value
    this.setState(state)
  }
  onSelectChange = ({ value }, { name }) => {
    let state = this.state
    state[name] = value
    this.setState(state)
  }
  transfer = opts => {
    let { type, amount, to } = opts
    switch (type) {
      case 'WITHDRAW':
        axios
          .post('/api/txn/newtxn', {
            from: { id: this.props.user, type: this.state.fromBalance },
            to: { id: undefined },
            amount,
            type: 'WITHDRAW'
          })
          .then(res => {
            this.props.update(res.data.fromUser)
          })
        break
      case 'DEPOSIT':
        axios
          .post('/api/txn/newtxn', {
            to: { id: this.props.user, type: this.state.toBalance },
            from: { id: undefined },
            amount,
            type: 'DEPOSIT'
          })
          .then(res => {
            this.props.update(res.data.toUser)
          })
        break
      case 'TRANSFER':
        axios
          .post('/api/txn/newtxn', {
            from: { id: this.props.user, type: this.state.fromBalance },
            to: { id: to, type: this.state.toBalance },
            amount,
            type: 'TRANSFER'
          })
          .then(res => {
            this.props.update(res.data.fromUser)
          })
        break
    }
  }
  render () {
    let { from, to, amount } = this.state
    let { action, transfer } = this.props

    if (action == 'WITHDRAW') {
      return (
        <div>
          <form>
            <fieldset id='sign_up' class='ba b--transparent ph0 mh0'>
              <legend class='ph0 mh0 fw6 clip'>WITHDRAW</legend>
              <div class='mt3'>
                <label class='db fw4 lh-copy f6' for='email-address'>
                  Withdraw Amount
                </label>
                <input
                  class='pa2 input-reset ba bg-transparent w-100 measure'
                  type='number'
                  name='amount'
                  value={amount}
                  onChange={this.onChange}
                  id='email-address'
                />
              </div>
              <label
                style={{ marginTop: '10px' }}
                class='db fw4 lh-copy f6'
                for='email-address'
              >
                Balance
              </label>
              <Select
                className='basic-single'
                classNamePrefix='select'
                options={[
                  { value: 'CHECKING', label: 'Checking Balance' },
                  { value: 'SAVINGS', label: 'Savings Balance' }
                ]}
                name='fromBalance'
                onChange={this.onSelectChange}
                defaultValue={{ value: 'CHECKING', label: 'Checking Balance' }}
                styles={{
                  container: styles => ({
                    ...styles,
                    width: '75%',
                    ':focus': {
                      borderColor: '#000',
                      outline: 'none'
                    }
                  }),
                  control: styles => ({
                    ...styles,
                    borderRadius: '0px',
                    border: '2px solid #000',
                    ':hover': {
                      borderColor: '#000'
                    },
                    ':focus': {
                      borderColor: '#000',
                      outline: 'none'
                    }
                  }),
                  menu: styles => ({
                    ...styles,
                    borderRadius: '0px',
                    ':hover': {
                      borderColor: '#000'
                    },
                    ':focus': {
                      borderColor: '#000',
                      outline: 'none'
                    }
                  })
                }}
              />
            </fieldset>

            <a
              class='f6 link dim ph3 pv2 mb2 dib white bg-black'
              onClick={e => {
                this.transfer({ type: 'WITHDRAW', amount })
              }}
            >
              WITHDRAW
            </a>
          </form>
        </div>
      )
    } else if (action == 'DEPOSIT') {
      return (
        <div>
          <form>
            <fieldset id='sign_up' class='ba b--transparent ph0 mh0'>
              <legend class='ph0 mh0 fw6 clip'>DEPOSIT</legend>
              <div class='mt3'>
                <label class='db fw4 lh-copy f6' for='email-address'>
                  Deposit Amount
                </label>
                <input
                  class='pa2 input-reset ba bg-transparent w-100 measure'
                  type='number'
                  onChange={this.onChange}
                  name='amount'
                  value={amount}
                  id='email-address'
                />
              </div>
              <label
                style={{ marginTop: '10px' }}
                class='db fw4 lh-copy f6'
                for='email-address'
              >
                Balance
              </label>
              <Select
                className='basic-single'
                classNamePrefix='select'
                options={[
                  { value: 'CHECKING', label: 'Checking Balance' },
                  { value: 'SAVINGS', label: 'Savings Balance' }
                ]}
                name='toBalance'
                onChange={this.onSelectChange}
                defaultValue={{ value: 'CHECKING', label: 'Checking Balance' }}
                styles={{
                  container: styles => ({
                    ...styles,
                    width: '75%',
                    ':focus': {
                      borderColor: '#000',
                      outline: 'none'
                    }
                  }),
                  control: styles => ({
                    ...styles,
                    borderRadius: '0px',
                    border: '2px solid #000',
                    ':hover': {
                      borderColor: '#000'
                    },
                    ':focus': {
                      borderColor: '#000',
                      outline: 'none'
                    }
                  }),
                  menu: styles => ({
                    ...styles,
                    borderRadius: '0px',
                    ':hover': {
                      borderColor: '#000'
                    },
                    ':focus': {
                      borderColor: '#000',
                      outline: 'none'
                    }
                  })
                }}
              />
            </fieldset>
            <div class='mt3'>
              <a
                class='f6 link dim ba ph3 pv2 mb2 dib black'
                onClick={e => {
                  this.transfer({ type: 'DEPOSIT', amount })
                }}
              >
                DEPOSIT
              </a>
            </div>
          </form>
        </div>
      )
    } else if (action == 'TRANSFER') {
      return (
        <div>
          <form>
            <fieldset id='sign_up' class='ba b--transparent ph0 mh0'>
              <legend class='ph0 mh0 fw6 clip'>Transfer</legend>
              <div class='mt3'>
                <label class='db fw4 lh-copy f6' for='email-address'>
                  Transfer Amount
                </label>
                <input
                  class='pa2 input-reset ba bg-transparent w-100 measure'
                  type='number'
                  name='amount'
                  id='email-address'
                  value={amount}
                  onChange={this.onChange}
                />
                <label
                  style={{ marginTop: '10px' }}
                  class='db fw4 lh-copy f6'
                  for='email-address'
                >
                  Balance
                </label>
                <Select
                  className='basic-single'
                  classNamePrefix='select'
                  options={[
                    { value: 'CHECKING', label: 'Checking Balance' },
                    { value: 'SAVINGS', label: 'Savings Balance' }
                  ]}
                  name='fromBalance'
                  onChange={this.onSelectChange}
                  defaultValue={{
                    value: 'CHECKING',
                    label: 'Checking Balance'
                  }}
                  styles={{
                    container: styles => ({
                      ...styles,
                      width: '75%',
                      ':focus': {
                        borderColor: '#000',
                        outline: 'none'
                      }
                    }),
                    control: styles => ({
                      ...styles,
                      borderRadius: '0px',
                      border: '2px solid #000',
                      ':hover': {
                        borderColor: '#000'
                      },
                      ':focus': {
                        borderColor: '#000',
                        outline: 'none'
                      }
                    }),
                    menu: styles => ({
                      ...styles,
                      borderRadius: '0px',
                      ':hover': {
                        borderColor: '#000'
                      },
                      ':focus': {
                        borderColor: '#000',
                        outline: 'none'
                      }
                    })
                  }}
                />
              </div>
              {/* <div class="mt3">
                <label class="db fw4 lh-copy f6" for="email-address">From</label>
                <input class="pa2 input-reset ba bg-transparent w-100 measure" type="text" name="from" id="email-address" value={from} onChange={this.onChange} required/>
              </div> */}
              <div class='mt3'>
                <label class='db fw4 lh-copy f6' for='email-address'>
                  To
                </label>
                <input
                  class='pa2 input-reset ba bg-transparent w-100 measure'
                  type='text'
                  name='to'
                  id='email-address'
                  value={to}
                  onChange={this.onChange}
                  required
                />
                <label
                  style={{ marginTop: '10px' }}
                  class='db fw4 lh-copy f6'
                  for='email-address'
                >
                  Balance
                </label>
                <Select
                  className='basic-single'
                  classNamePrefix='select'
                  options={[
                    { value: 'CHECKING', label: 'Checking Balance' },
                    { value: 'SAVINGS', label: 'Savings Balance' }
                  ]}
                  name='toBalance'
                  onChange={this.onSelectChange}
                  defaultValue={{
                    value: 'CHECKING',
                    label: 'Checking Balance'
                  }}
                  styles={{
                    container: styles => ({
                      ...styles,
                      width: '75%',
                      ':focus': {
                        borderColor: '#000',
                        outline: 'none'
                      }
                    }),
                    control: styles => ({
                      ...styles,
                      borderRadius: '0px',
                      border: '2px solid #000',
                      ':hover': {
                        borderColor: '#000'
                      },
                      ':focus': {
                        borderColor: '#000',
                        outline: 'none'
                      }
                    }),
                    menu: styles => ({
                      ...styles,
                      borderRadius: '0px',
                      ':hover': {
                        borderColor: '#000'
                      },
                      ':focus': {
                        borderColor: '#000',
                        outline: 'none'
                      }
                    })
                  }}
                />
              </div>
            </fieldset>
            <a
              class='f6 link dim ph3 pv2 mb2 dib white bg-black'
              onClick={e => {
                this.transfer({ type: 'TRANSFER', to, amount })
              }}
            >
              Transfer
            </a>

            {/* <button onClick={this.depositMoney}></button> */}
          </form>
        </div>
      )
    }
  }
}

export default Action
