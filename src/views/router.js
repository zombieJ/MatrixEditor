import React from 'react';
import { Match } from 'react-router';

import Home from './Home';
import Open from './Open';
import Ability from './Ability';
import About from './About';
import Dev from './Dev';
import { verifyProject } from './Page';

const VAbility = verifyProject(Ability);

const Router = () => (
	<div>
		<Match pattern="/" exactly component={Home} />
		<Match pattern="/open" component={Open} />
		<Match pattern="/ability" component={VAbility} />
		<Match pattern="/about" component={About} />
		<Match pattern="/dev" component={Dev} />
	</div>
);

export default Router;
