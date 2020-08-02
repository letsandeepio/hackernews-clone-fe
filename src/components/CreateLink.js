import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      url
      description
    }
  }
`;

export default function CreateLink(props) {
  const [state, setState] = useState({
    description: '',
    url: ''
  });

  return (
    <div>
      <div className="flex flex-column mt3">
        <input
          className="mb2"
          value={state.description}
          onChange={(e) => setState({ ...state, description: e.target.value })}
          type="text"
          placeholder="A description for the link"
        />
        <input
          className="mb2"
          value={state.url}
          onChange={(e) => setState({ ...state, url: e.target.value })}
          type="text"
          placeholder="The URL for the link"
        />
      </div>
      <Mutation
        mutation={POST_MUTATION}
        variables={{ description: state.description, url: state.url }}
        onCompleted={() => props.history.push('/')}
      >
        {(postMutation) => <button onClick={postMutation}>Submit</button>}
      </Mutation>
    </div>
  );
}
