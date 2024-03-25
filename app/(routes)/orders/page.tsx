import { getOrdersByEvent } from "@/app/actions/order.actons";
import Search from "@/components/search";
import { formatPrice } from "@/lib/utils";
import { OrderItem, SearchParamsProps } from "@/types/types";

import moment from "moment";

const OrdersPage = async ({ searchParams }: SearchParamsProps) => {
  const eventId = (searchParams?.eventId as string) || "";
  const searchText = (searchParams?.query as string) || "";

  const orders = await getOrdersByEvent({ searchText, eventId });
  console.log(orders);
  return (
    <>
      <section className="flex justify-center w-full">
        <Search />
      </section>
      <section className="max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 overflow-x-auto">
        <table className="border-t border-collapse w-full">
          <thead>
            <tr className="border-b text-slate-500 ">
              <th className="min-w-[250px] text-left py-4">order ID</th>
              <th className="min-w-[200px] text-left py-4">Event Title</th>
              <th className="min-w-[180px] text-left">Buyer</th>
              <th className="min-w-[120px] text-left">Amount</th>
              <th className="min-w-[100px] text-right">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length === 0 ? (
              <tr className="border-b">
                <td
                  colSpan={5}
                  className="text-center text-muted-foreground py-4"
                >
                  No orders found.
                </td>
              </tr>
            ) : (
              <>
                {orders &&
                  orders.map((order: any) => (
                    <tr
                      key={order.id}
                      className="text-sm font-normal leading-5 lg:text-base leading-6 border-b"
                    >
                      <td className="min-w-[250px] py-4">{order.id}</td>
                      <td className="min-w-[200px] py-4">
                        {order.event.title}
                      </td>
                      <td className="min-w-[180px] py-4">
                        {order.user.first_name} {order.user.last_name}
                      </td>
                      <td className="min-w-[120px] py-4">
                        {formatPrice(order.totalAmount)}
                      </td>
                      <td className="min-w-[100px] py-4 text-right">
                        {moment(order.createdAt).format("llll")}
                      </td>
                    </tr>
                  ))}
              </>
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default OrdersPage;
