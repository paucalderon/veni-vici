
import { useState } from 'react'
import DogCard from './components/DogCard'
import BanList from './components/BanList'
import './App.css'

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY

function App() {
  const [dog, setDog] = useState(null)
  const [banList, setBanList] = useState([])
  const [history, setHistory] = useState([])

  function banAttribute(attribute) {
    if (!attribute || banList.includes(attribute)) return

    setBanList((currentList) => [...currentList, attribute])
  }

  async function testAPI() {
    try {
      const response = await fetch('https://api.thedogapi.com/v1/breeds', {
        headers: {
          'x-api-key': ACCESS_KEY
        }
      })

      if (!response.ok) throw new Error('Failed to fetch dogs')

      const data = await response.json()

      const availableDogs = data.filter((breed) => {
        const traits = breed.temperament
          ? breed.temperament.split(',').map((trait) => trait.trim())
          : []

        const attributes = [
          breed.name,
          breed.life_span,
          breed.breed_group,
          ...traits
        ]

        return (
          breed.image?.url &&
          !attributes.some((attribute) =>
            banList.some(
              (banned) =>
                banned.toLowerCase() === attribute?.toLowerCase()
            )
          )
        )
      })

      if (availableDogs.length === 0) {
        alert('No dogs match your ban list! Remove a ban to continue.')
        return
      }

      const randomDog =
        availableDogs[Math.floor(Math.random() * availableDogs.length)]

      setDog(randomDog)
      setHistory((current) => [randomDog, ...current].slice(0, 8))
    } catch (error) {
      console.error(error)
      alert('Something went wrong fetching dogs. Please try again!')
    }
  }

  return (
    <div className="app-layout">
      <aside className="history-sidebar">
        <h2>🐾 Paw Prints</h2>
        <p className="sidebar-subtitle">Pups you've met along the way!</p>

        {history.length === 0 ? (
          <p className="empty-message">Your adventure starts here ♡</p>
        ) : (
          history.map((pastDog, index) => (
            <div className="history-item" key={`${pastDog.id}-${index}`}>
              <img src={pastDog.image?.url} alt={pastDog.name} />
              <p>{pastDog.name}</p>
            </div>
          ))
        )}
      </aside>

      <main className="main-content">
        <header className="app-header">
          <div className="header-decoration">🐶 🐾 🎀 🦴 🐾 🐶</div>
          <h1>Veni Vici!</h1>
          <p>Discover your next favorite dog ♡</p>
          <span className="header-tagline">
            A little bit of puppy love, one click at a time!
          </span>
        </header>

        <section className="dog-section">
          <DogCard dog={dog} banAttribute={banAttribute} />

          <button className="discover-button" onClick={testAPI}>
            🐾 Discover a Pup!
          </button>
        </section>
      </main>

      <aside className="ban-sidebar">
        <BanList banList={banList} setBanList={setBanList} />
      </aside>
    </div>
  )
}

export default App
