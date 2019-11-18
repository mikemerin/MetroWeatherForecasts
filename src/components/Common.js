import React, { Component } from 'react';
import { Loader, Icon } from 'semantic-ui-react';

export const DataLoadingMessage = (props) => {
  const { type } = props;
  return (
    <center>
      <br />
      <Loader active inline size="massive" />
      <br />
      <h1>
        {type} data is loading or is currently offline.<br />
        If this takes more than 10 seconds, please try again in a few minutes.< br/>
        If this problem persists, please contact Mike Merin.
      </h1>
    </center>
  )
}

export const DataErrorMessage = (props) => {
  const { type } = props;
  return (
    <center>
      <br />
      <Icon name="warning sign" size="massive" color="red" />
      <br />
      <h1>
        There was an error loading this {type} page.<br />
        Please try again in a few minutes.< br/>
        If this problem persists, please contact Mike Merin.
      </h1>
    </center>
  )
}

// todo: add in common constants like WxTypes, Scrambler, and anything else here
