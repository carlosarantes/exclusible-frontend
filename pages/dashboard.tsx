import "tailwindcss/tailwind.css";
import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import Router from "next/router";
import axios from "axios";

const Dashboard: NextPage = () => {
  const [binanceData, setBinanceData] = useState<Record<string, unknown>>();

  useEffect(() => {
    const token = Cookies.get("token");
    axios
      .get("http://172.44.9.1:3001/exchange", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => setBinanceData(res.data?.binance));
  }, []);

  const logout = useCallback(() => {
    Cookies.remove("token");
    Router.push("");
  }, []);

  return (
    <div className="h-screen bg-slate-300 flex justify-center items-center ">
      <table className="table-auto bg-slate-50">
        <thead>
          <tr>
            <th>Name</th>
            <th>Slug</th>
            <th>Logo</th>
            <th>Description</th>
            <th>Date launched</th>
            <th>Maker fee</th>
            <th>Taker fee</th>
            <th>Weekly visits</th>
            <th>Spot volume USD</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{binanceData?.name as string}</td>
            <td>{binanceData?.slug as string}</td>
            <td>{binanceData?.logo as string}</td>
            <td>{binanceData?.description as string}</td>
            <td>{binanceData?.date_launched as string}</td>
            <td>{binanceData?.maker_fee as number}</td>
            <td>{binanceData?.taker_fee as number}</td>
            <td>{binanceData?.weekly_visits as string}</td>
            <td>{binanceData?.spot_volume_usd as string}</td>
          </tr>
        </tbody>
      </table>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export async function getServerSideProps(ctx: any) {
  if (!ctx.req.cookies?.token) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return { props: {} };
}

export default Dashboard;
