import React from 'react';
import KVSelectInput from '../KVSelectInput';

const OPTIONS = [
	{ value: '1' },
	{ value: '0' },
];

const KVBoolInput = ({ ...props }) => (
	<KVSelectInput {...props} options={OPTIONS} />
);

export default KVBoolInput;
