"use client";
import Link from "next/link";
import React, { useEffect } from "react";

export default function Page() {
	useEffect(() => {
		fetch(
			"https://ind-checker-server.ameliamargaurite.dev/BIO/Den_Haag_IND_Desk/5"
		)
			.then((data) => data.json())
			.then((json) => console.log(json));
	}, []);

	return (
		<section>
			<Link href="/game">Game</Link>
		</section>
	);
}
