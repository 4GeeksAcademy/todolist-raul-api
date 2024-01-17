import { useState, useEffect } from "react";

export function useFetch(url) {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		fetch(url)
			.then((response) => response.json())
			.then((data) => setData(data))
			.finally(() => setLoading(false));
	}, []);

	fetch(url, {
		method: "POST",
		mode: "cors",
		redirect: "follow",
		headers: new Headers({
			"Content-Type": "text/plain",
		}),
	});
	if (response.ok) {
		console.log("Usuario creado");
	} else {
		console.error("Error al crear el usuario", response.statusText);
	}
	return { data, loading };
}

// if (response.ok) {
// 	console.log("Usuario creado");
//   } else {
// 	console.error(
// 	  "Error al crear usuario:",
// 	  response.statusText
// 	);
