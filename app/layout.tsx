import React from "react";
import Header from "./header";
import Footer from "./footer";
import "../public/scss/main.scss";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<Header />
				{children}
				{/* <Footer /> */}
			</body>
		</html>
	);
}
