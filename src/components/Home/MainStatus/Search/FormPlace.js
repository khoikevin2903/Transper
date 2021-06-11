import React, { useState } from 'react';

function FormStartPlace(props) {

	const { array, name, type, HandleChange } = props;
	
	const [value, setValue] = useState({
		[name]: null
	});

	const HandleChangePlace = (e) => {
		const target = e.target;
		const name = target.name;
		const val = target.value;
		setValue({ [name]: val });
		HandleChange({[name] : val});
	}

	const elm = array ? array.map((arr, index) => {
		return <option value={arr} key={index} className="text-sm opacity-70">{arr}</option>
	}) : "";

	return (
		<div className={`inline-block relative px-1 ml-2 py-1 font-thin text-base`} style={{width: "170px"}}>
			<select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-2 py-2 rounded leading-tight focus:outline-none focus:shadow-outline"
				name={name} value={value.value} onChange={HandleChangePlace}>
				<option className="text-sm opacity-70">{type}</option>
				{elm}
			</select>
			<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
				<svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
			</div>
		</div>
	);
}

export default FormStartPlace;