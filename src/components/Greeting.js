import React, { Component } from 'react';
import { Form, Button, Segment } from 'semantic-ui-react';
import Scrambler from './Scrambler';

export default class Greeting extends Component {

  constructor(props) {
    super(props);
    this.state = {
      p: "uYmtlgtbyzm",
      a: ["How's it going?", "How are you?", "What's up?", "What are you doing?", "How's the weather?", "How's it hanging?", "Sup?", "How have you been?", "Where have you been?", "How's your day going?", "How do you do?", "What have you been up to?", "Seen anything good recently?", "Any storms out there?", "Feeling good?", "Whattup?", "Feeling good?", "How's it looking out there?", "Have a good week so far?", "Mondays, am I right?", "What's your favorite number?", "What's your favorite food?", "What's your favorite book?", "What's your favorite movie?", "Mac or PC?"],
      q: '',
      v: ''
    }
  }

  componentDidMount() { this.q() }; q = () => { const {a} = this.state; this.setState({ q: a[Math.floor(Math.random()*a.length)] }) }; handleInput = (e) => { this.setState({ v: e.target.value }) }; onFormSubmit = (e, c) => { e.preventDefault(); const { p, v } = this.state; if (Scrambler(v) === p) this.props.hl(); this.q() }

  render() {

    return (
      <center>
        <Segment compact textAlign='center'>
          <Form onSubmit={ this.onFormSubmit }>
            <Form.Field>
              <input type='password' onChange={ this.handleInput } />
            </Form.Field>
            <Button type='sumbit'>{this.state.q}</Button>
          </Form>
        </Segment>
      </center>
    )
  }

}
