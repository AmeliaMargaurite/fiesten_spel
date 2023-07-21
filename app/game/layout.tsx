import React from "react";
import "./game.scss";

export default function GameWindowLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <section className="game">{children}</section>;
}
