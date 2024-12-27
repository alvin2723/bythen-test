"use client";
import React, { Fragment, useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getUserList } from "@/lib/actions";
import { useInView } from "react-intersection-observer";
import { UserCard, ShimmerCard } from "@/components/UserCard";
import { Spinner } from "@/components/ui/Spinner";
import { useSidebar } from "@/hooks/useSidebar";
import { User } from "@/lib/types";

const UserList = ({ search }: { search: string }) => {
  const { isOpen } = useSidebar();
  const [isLoadShimmer, setIsLoadShimmer] = useState(false);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["users", { search }],
    queryFn: getUserList,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1; // Fetch the next page
      }
      return undefined;
    },
  });

  const [ref, inView] = useInView({ threshold: 1.0 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      setIsLoadShimmer(true);
      const timeoutId = setTimeout(() => {
        fetchNextPage();
        setIsLoadShimmer(false);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage, isLoadShimmer]);

  const showUsers = () => {
    if (status === "pending") return <Spinner />;
    if (status === "error") return <p>Error: {error.message}</p>;
    return (
      <>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-y-10 md:gap-y-12 lg:gap-y-[69px] items-center justify-center">
          {data?.pages.map((page, index) => (
            <Fragment key={index}>
              {page.data.map((user: User) => (
                <UserCard user={user} key={user.id} />
              ))}
            </Fragment>
          ))}
        </div>
        <div className="w-full">
          <button
            ref={ref}
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
            className="w-full"
          >
            {isLoadShimmer && !isFetching ? (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 items-center justify-center mt-[69px] gap-y-10 md:gap-y-12 xl:gap-y-0">
                {[1, 2, 3, 4].map((_, index) => (
                  <ShimmerCard key={index} />
                ))}
              </div>
            ) : hasNextPage ? (
              "Scroll to Load More"
            ) : (
              ""
            )}
          </button>
        </div>
      </>
    );
  };

  return (
    <section
      className={` flex flex-col pl-6 pr-6 lg:pl-[42px] lg:pr-0 items-center sm:items-start ml-auto transition-all duration-200  ${
        isOpen
          ? "w-full lg:w-[calc(100%-276px)]"
          : "w-full lg:w-[calc(100%-76px)]"
      }`}
    >
      <div className="w-full  overflow-hidden mt-[82px]">{showUsers()}</div>
    </section>
  );
};

export default UserList;
