import ImageContainer from "./Components/ImageContainer";
import Pagination from "./Components/Pagination";
import { TabSection } from "./Components/TabSection";
import SearchSection from "./Components/SearchSection";
import axios from "axios";
import { useState } from "react";
import { Footer } from "./Components/Footer";

const fetchData = async (query: string, page: string) => {
  let url = `https://simple-pexels-proxy.onrender.com/search?query=${query}&per_page=10&page=${page}`;

  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default async function Home({ searchParams }: { searchParams: any }) {
  let response = await fetchData(
    searchParams?.searchQuery ? searchParams?.searchQuery : "cars",
    searchParams?.pageNumber ? searchParams?.pageNumber : "1"
  );

  const totalPage = response?.total_results / response?.per_page;


  return (
    <main>
      <SearchSection />
      <TabSection />
      <Pagination
        currentPage={searchParams?.pageNumber}
        totalPage={totalPage}
        totalData={response?.total_results}
        isTotalVisible={true}
        searchQuery={searchParams?.searchQuery}
      />
      <ImageContainer
        photos={response?.photos}
        searchParams={searchParams?.pageNumber}
      />
      <Pagination
        currentPage={searchParams?.pageNumber}
        totalPage={totalPage}
        totalData={response?.total_results}
        isTotalVisible={false}
        searchQuery={searchParams?.searchQuery}
      />
      <Footer />
    </main>
  );
}
