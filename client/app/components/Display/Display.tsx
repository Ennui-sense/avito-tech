import "./Display.scss";

import DisplayButton from "../DisplayButton/DisplayButton";

import { DisplayButtonsData } from "~/data/DisplayButtonsData";

import { useState } from "react";

const Display = () => {
	const [activeId, setActiveId] = useState<number>(1);

	const handleClick = (id: number) => {
		setActiveId(id)
	}

	return (
		<div className="display">
			{DisplayButtonsData.map(({id, Icon}) => (
				<DisplayButton key={id} Icon={Icon} onClick={() => handleClick(id)} active={activeId === id}/>
			))}
		</div>
	)
}

export default Display