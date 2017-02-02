import React from 'react';

import KVTreeView from '../../containers/KVTreeView';
import KVEditor from '../../containers/KVEditor';

export default () => (
	<div className="row fixed">
		<div className="col-md-3">
			<div className="panel">
				<KVTreeView name="ability" />
			</div>
		</div>

		<div className="col-md-9">
			<KVEditor name="ability" />
		</div>
	</div>
);
