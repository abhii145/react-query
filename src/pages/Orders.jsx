import { useSelector } from "react-redux"

const Orders = () => {
  const orders = useSelector((state) => state.order.orders)
  console.log(orders)

  if (orders.length === 0) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-gray-700">No Orders Found</h1>
        <p className="text-gray-500 mt-2">
          Your orders will appear here after a successful purchase.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-extrabold text-gray-800 mb-4">
        Your Orders
      </h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="p-4 bg-white rounded-md shadow-md space-y-4"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-800">
                Order #{order.id}
              </h2>
              <p className="text-sm text-gray-500">{order.date}</p>
            </div>
            <ul className="space-y-2">
              {order.items.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center text-sm text-gray-700"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-md"
                      loading="lazy"
                    />
                    <div>
                      <p className="font-bold">{item.title}</p>
                      <p className="text-gray-500">{item.description}</p>
                      <p className="text-gray-500">Price: ₹{item.price}</p>
                      <p className="text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="text-right font-bold text-gray-800">
              Total: ₹{order.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
