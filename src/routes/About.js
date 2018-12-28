import React from 'react';

const About = ({match}) => {
  return (
    <div>
      {match.params.username}'s ABOUT
    </div>
  );
};

export default About;