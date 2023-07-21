"use client";

import { ForwardedRef, forwardRef, useEffect, useRef } from "react";
import "./bike.scss";

type BikeProps = {
	keydownHandler: (event: KeyboardEvent) => void;
};

export const Bike = forwardRef(function Bike(
	props: BikeProps,
	vehicleRef: any
) {
	useEffect(() => {
		document.addEventListener("keydown", props.keydownHandler);

		return () => {
			document.removeEventListener("keydown", props.keydownHandler);
		};
	}, []);

	return (
		<span
			ref={vehicleRef}
			style={{ gridColumn: 3 }}
			className="icon bike"
		></span>
	);
});
