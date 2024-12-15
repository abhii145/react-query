import { useSelector } from "react-redux"

const Orders = () => {
  const orders = useSelector((state) => state.order.orders)

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <h1 className="text-3xl font-bold text-gray-800">No Orders Found</h1>
        <p className="text-gray-500 mt-2 text-lg">
          Your orders will appear here after a successful purchase.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
        Your Orders
      </h1>
      <div className="space-y-8">
        {orders.map((order) => (
          <div
            key={order.id}
            className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">
                Order #{order.id}
              </h2>
              <p className="text-sm text-gray-500">{order.date}</p>
            </div>
            <ul className="space-y-4">
              {order.items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-4 border-b pb-4 last:border-none"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-md shadow-sm"
                    loading="lazy"
                  />
                  <div className="flex-1">
                    <p className="text-lg font-semibold text-gray-800">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                    <p className="text-sm text-gray-500">
                      Price: ₹{item.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="text-right mt-4">
              <p className="text-lg font-bold text-gray-900">
                Total: ₹
                {order.items
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
