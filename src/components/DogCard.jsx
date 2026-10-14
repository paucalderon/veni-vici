
function DogCard({ dog, banAttribute }) {
    if (!dog) {
      return (
        <div className="empty-dog-card">
          <div className="empty-dog-icon">🐶</div>
          <h2>Ready to meet your new bestie?</h2>
          <p>Click Discover to find an adorable pup!</p>
          <span>♡ 🐾 ♡</span>
        </div>
      )
    }
  
    const temperaments = dog.temperament
      ? dog.temperament.split(',').map((trait) => trait.trim())
      : []
  
    return (
      <div className="dog-card">
        <div className="dog-card-heading">
          <span className="little-heart">♡</span>
          <h2>Meet {dog.name}!</h2>
          <span className="little-heart">♡</span>
        </div>
  
        <div className="dog-image-container">
          <img src={dog.image?.url} alt={dog.name} className="dog-image" />
        </div>
  
        <p className="attribute-hint">
          Tap an attribute to add it to your ban list!
        </p>
  
        <div className="dog-details">
          <div className="detail-group">
            <h3>🐕 Breed</h3>
            <button
              className="attribute-button"
              onClick={() => banAttribute(dog.name)}
            >
              {dog.name}
            </button>
          </div>
  
          <div className="detail-group">
            <h3>🎂 Life Span</h3>
            <button
              className="attribute-button"
              onClick={() => banAttribute(dog.life_span)}
            >
              {dog.life_span}
            </button>
          </div>
  
          <div className="detail-group">
            <h3>🦴 Breed Group</h3>
            <button
              className="attribute-button"
              onClick={() => banAttribute(dog.breed_group)}
              disabled={!dog.breed_group}
            >
              {dog.breed_group || 'Unknown'}
            </button>
          </div>
  
          <div className="detail-group temperament-group">
            <h3>💗 Personality</h3>
            <div className="trait-list">
              {temperaments.length > 0 ? (
                temperaments.map((trait) => (
                  <button
                    key={trait}
                    className="attribute-button"
                    onClick={() => banAttribute(trait)}
                  >
                    {trait}
                  </button>
                ))
              ) : (
                <p>Unknown</p>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
  
export default DogCard
  