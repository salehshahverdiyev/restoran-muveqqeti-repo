import { useState, useEffect } from "react";
import './style.css';

function App() {
  const [orders, setOrders] = useState([]); 
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddOrder = () => {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const formattedTime = `${hours}:${minutes < 10 ? `0${minutes}` : minutes}`;

    setOrders([
      ...orders,
      {
        id: Date.now(),
        name: "",
        time: formattedTime,
        total: 0,
        phone: "",
        address: "",
        courier: "",
        createdHours: hours,
        createdAt: currentTime // Store the actual Date object
      },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    setOrders(
      orders.map((order, i) =>
        i === index ? { ...order, [field]: value } : order
      )
    );
  };

  const handleTotalChange = (index, value) => {
    setOrders(
      orders.map((order, i) =>
        i === index ? { ...order, total: parseFloat(value) } : order
      )
    );
  };

  const handleDeleteAllOrders = () => {
    setOrders([]);
  };

  const handleDeleteOrder = (index) => {
    setOrders(orders.filter((_, i) => i !== index));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredOrders = orders.filter((order) => {
    return (
      order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.time.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.total.toString().includes(searchTerm) ||
      order.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.courier.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Calculate time difference
  useEffect(() => {
    const updateOrderTimes = setInterval(() => {
      setOrders(
        orders.map((order) => {
          const now = new Date();
          const timeDiff = now - order.createdAt; // Time difference in milliseconds
          const hours = Math.floor(timeDiff / (1000 * 60 * 60)); // Hours
          const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)); // Minutes

          return {
            ...order,
            timeDiff: `${hours} saat ${minutes} dəqiqə öncə`,
          };
        })
      );
    }, 60000); // Update every 60 seconds (1 minute)

    return () => clearInterval(updateOrderTimes);
  }, [orders]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sifarişlər</h1>

      <div className="flex justify-end mb-4">
        <input
          type="text"
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Axtar..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
          onClick={handleAddOrder}
        >
          + Yeni sifariş əlavə et
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
          onClick={handleDeleteAllOrders}
        >
          Bütün hesabı bağla
        </button>
      </div>

      <p className="text-sm mb-4">Cəmi {filteredOrders.length} sifariş əlavə edilmişdir.</p>

      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">No</th>
            <th className="px-4 py-2">Ad Soyad</th>
            <th className="px-4 py-2">Saat</th>
            <th className="px-4 py-2">Vaxt fərqi</th>
            <th className="px-4 py-2">Cəmi</th>
            <th className="px-4 py-2">Telefon</th>
            <th className="px-4 py-2">Ünvan</th>
            <th className="px-4 py-2">Kuryer</th>
            <th className="px-4 py-2">Hesabı bağla</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr> 
              <td className="border px-4 py-2">1</td> 
              <td className="border px-4 py-2">
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Ad soyad"
                  onChange={(e) => handleInputChange(0, "name", e.target.value)}
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Saat"
                  onChange={(e) => handleInputChange(0, "time", e.target.value)}
                />
              </td>
              <td className="border px-4 py-2">
                {/* Placeholder for time difference */}
              </td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Cəmi"
                  onChange={(e) => handleTotalChange(0, e.target.value)}
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Telefon"
                  onChange={(e) => handleInputChange(0, "phone", e.target.value)}
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Ünvan"
                  onChange={(e) => handleInputChange(0, "address", e.target.value)}
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Kuryer"
                  onChange={(e) => handleInputChange(0, "courier", e.target.value)}
                />
              </td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDeleteOrder(0)}
                >
                  Hesabı bağla
                </button>
              </td>
            </tr>
          ) : (
            filteredOrders.map((order, index) => (
              <tr
                key={order.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
              >
                <td className="border px-4 py-2">
                  {index + 1}
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Ad soyad"
                    value={order.name}
                    onChange={(e) =>
                      handleInputChange(index, "name", e.target.value)
                    }
                  />
                </td>
                <td className="border px-4 py-2">
                  {/* Time is now automatically filled */}
                  {order.time}
                </td>
                <td className="border px-4 py-2">
                  {order.timeDiff}
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Cəmi"
                    value={order.total}
                    onChange={(e) =>
                      handleTotalChange(index, e.target.value)
                    }
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Telefon"
                    value={order.phone}
                    onChange={(e) =>
                      handleInputChange(index, "phone", e.target.value)
                    }
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Ünvan"
                    value={order.address}
                    onChange={(e) =>
                      handleInputChange(index, "address", e.target.value)
                    }
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Kuryer"
                    value={order.courier}
                    onChange={(e) =>
                      handleInputChange(index, "courier", e.target.value)
                    }
                  />
                </td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDeleteOrder(index)}
                  >
                    Hesabı bağla
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;