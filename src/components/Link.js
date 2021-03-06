import React, { Component } from 'react';
import { AUTH_TOKEN } from '../constants';
import { timeDifferenceForDate } from '../utils';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

class Link extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votes: this.props.link.votes.length
    };
  }

  getHostName(url) {
    return new URL(url).hostname;
  }

  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);

    return (
      <div className="flex mt2 items-start">
        <div className="flex items-center">
          <span className="gray">{this.props.index + 1}.</span>
          {authToken && (
            <Mutation
              onError={(error) => console.log(error)}
              mutation={VOTE_MUTATION}
              variables={{ linkId: this.props.link.id }}
              onCompleted={() =>
                this.setState((state) => {
                  return {
                    votes: state.votes + 1
                  };
                })
              }
            >
              {(voteMutation) => (
                <div className="ml1 gray f11" onClick={voteMutation}>
                  ▲
                </div>
              )}
            </Mutation>
          )}
        </div>
        <div className="ml1">
          <div>
            <a
              href={this.props.link.url}
              style={{
                fontFamily: 'Verdana, Geneva, sans-serif',
                fontSize: '13pt',
                lineHeight: '14pt',
                textDecoration: 'none',
                color: 'black'
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              {this.props.link.description}{' '}
              <span className="comhead">
                ({this.getHostName(this.props.link.url)})
              </span>
            </a>
          </div>
          <div className="f6 lh-copy gray">
            {this.state.votes} votes | by{' '}
            {this.props.link.postedBy
              ? this.props.link.postedBy.name
              : 'Unknown'}{' '}
            {timeDifferenceForDate(Number(this.props.link.createdAt))}
          </div>
        </div>
      </div>
    );
  }
}

export default Link;
