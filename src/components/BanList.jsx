function BanList({ banList, setBanList }) {
    function removeAttribute(attribute) {
      setBanList((currentList) =>
        currentList.filter((item) => item !== attribute)
      )
    }
  
    return (
      <div className="ban-list">
        <div className="ban-header">
          <span>🎀</span>
          <h2>Ban List</h2>
        </div>
  
        <p className="sidebar-subtitle">
          Not your cup of tea? Ban an attribute!
        </p>
  
        {banList.length === 0 ? (
          <div className="empty-ban-list">
            <span>🐾</span>
            <p>No banned attributes yet!</p>
            <p>Click a dog's attribute to add it here.</p>
          </div>
        ) : (
          <div className="ban-items">
            {banList.map((attribute) => (
              <button
                className="ban-button"
                key={attribute}
                onClick={() => removeAttribute(attribute)}
              >
                {attribute} ✕
              </button>
            ))}
          </div>
        )}
  
        {banList.length > 0 && (
          <button
            className="clear-button"
            onClick={() => setBanList([])}
          >
            Clear All ♡
          </button>
        )}
      </div>
    )
  }
  
export default BanList
  
