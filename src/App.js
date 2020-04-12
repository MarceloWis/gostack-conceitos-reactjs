import React, { useState, useEffect } from "react";

import "./styles.css";
import api from './services/api';

function App() {
	const [repositories, setRepositories] = useState([])

	useEffect(() => {
		async function getRepositories() {
			const { data } = await api.get('/repositories')
			setRepositories(data)
		}
		getRepositories()
	}, [])

  async function handleAddRepository() {
    const { data } = await api.post('/repositories', { title: 'Desafio ReactJS' })
	setRepositories([...repositories, data])
}

  async function handleRemoveRepository(id) {
	await api.delete(`/repositories/${id}`)

	const repo = repositories.filter(repository => repository.id !== id)
	setRepositories(repo)
  }

  return (
    <div>
      <ul data-testid="repository-list">
		  {repositories.map((item, index) => (
			<li key={index}>
				{item.title}

				<button onClick={() => handleRemoveRepository(item.id)}>
				Remover
				</button>
			</li>
		  ))}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
