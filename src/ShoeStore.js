import React, { useState } from 'react';

const ShoeStore = () => {
    const [cart, setCart] = useState(0);
    const [shoes, setShoes] = useState([
        { name: 'Navy Blue Armenia Shoe', description: '100% cotton', price: 1299, long: 17, medium: 16, short: 11 },
        { name: 'Gucci Shoe', description: '100% cotton', price: 2000, long: 17, medium: 16, short: 11 }
    ]);
    const [selectedShoe, setSelectedShoe] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);

    const addToCart = (index, size) => {
        let newShoes = [...shoes];
        newShoes[index][size]--;
        setShoes(newShoes);
        setCart(cart + 1);
        setSelectedItems([...selectedItems, { ...newShoes[index], size }]);
    };

    const calculateTotalPrice = () => {
        return selectedItems.reduce((total, item) => total + item.price, 0);
    };

    const addProduct = () => {
        if (selectedShoe !== '' && selectedSize !== '') {
            let index = shoes.findIndex((shoe) => shoe.name === selectedShoe);
            addToCart(index, selectedSize);
        }
    };

    return (
        <div>
            <div>
                <select value={selectedShoe} onChange={(e) => setSelectedShoe(e.target.value)}>
                    <option value="">Select Shoe</option>
                    {shoes.map((shoe, index) => (
                        <option key={index} value={shoe.name}>{shoe.name}</option>
                    ))}
                </select>
                <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                    <option value="">Select Size</option>
                    <option value="long">Long Available</option>
                    <option value="medium">Medium Available</option>
                    <option value="short">Short Available</option>
                </select>
               
                <button onClick={addProduct}>Add Product</button>
                <p>Cart: {cart}</p>
            </div>
            
            {shoes.map((shoe, index) => (
                <div key={index}>
                    <h2>{shoe.name}</h2>
                    <p>{shoe.description}</p>
                    <p>Price: {shoe.price}</p>
                    {shoe.long > 0 && (
                        <button onClick={() => addToCart(index, "long")}>
                            Buy Long ({shoe.long})
                        </button>
                    )}
                    {shoe.medium > 0 && (
                        <button onClick={() => addToCart(index, "medium")}>
                            Buy Medium ({shoe.medium})
                        </button>
                    )}
                    {shoe.short > 0 && (
                        <button onClick={() => addToCart(index, "short")}>
                            Buy Short ({shoe.short})
                        </button>
                    )}
                </div>
            ))}
            

            {/* Display selected items under respective shoe names */}
            <div>
                <h2>Navy Blue Armenia Shoe:</h2>
                {selectedItems
                  .filter((item) => item.name === "Navy Blue Armenia Shoe")
                  .map((item, index) => (
                      <div key={index}>
                          <p>{item.size.toUpperCase()} - ${item.price}</p>
                      </div>
                  ))}
            </div>

            <div>
                <h2>Gucci Shoe:</h2>
                {selectedItems
                  .filter((item) => item.name === "Gucci Shoe")
                  .map((item, index) => (
                      <div key={index}>
                          <p>{item.size.toUpperCase()} - ${item.price}</p>
                      </div>
                  ))}
            </div>

            {/* Display total price */}
            <p>Total: ${calculateTotalPrice()}</p>

        </div>
    );
};

export default ShoeStore;
