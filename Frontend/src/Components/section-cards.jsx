import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react"

import { Badge } from "../Components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../Components/ui/card"
import { useDispatch, useSelector } from "react-redux";
import { fetchAllReviews } from "../common/reviewSlice";
import { fetchGames } from "../common/gameSlice";
import { fetchBlogs } from "../common/blogSlice";
import { fetchCasinos } from "../common/casinoSlice";
import { useEffect } from "react";

export function SectionCards() {
  const dispatch = useDispatch();
  const {data:casinos} = useSelector((state) => state.casinos);
  const { data: blogs } = useSelector((state) => state.blogs);
  const {data:games} = useSelector((state) => state.games);
  const  {allReviews}  = useSelector((state) => state.reviews);

  
    useEffect(() => {
      dispatch(fetchAllReviews());
    }, [dispatch]);

    useEffect(() => {
      dispatch(fetchGames());
    }, [dispatch]);

    useEffect(() => {
      dispatch(fetchBlogs());
    }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCasinos());
  }, [dispatch]);
  return (
    <div
      className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">

      {/* Casinos */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Casinos Listed</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {casinos?.length}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +15 new this month
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            Highest rated: Casino Royale
          </div>
          <div className="text-muted-foreground">
            Based on user reviews & engagement
          </div>
        </CardFooter>
      </Card>

      {/* Blogs */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Published Blog Posts</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {blogs?.length}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingDown />
              -8% this month
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            Less content published <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Focus on quality over quantity
          </div>
        </CardFooter>
      </Card>

      {/* Games */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Available Games</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {games?.length}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +2.3%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            Most played: Book of Dead
          </div>
          <div className="text-muted-foreground">
            Slot games dominate user activity
          </div>
        </CardFooter>
      </Card>

      {/* Reviews */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total User Reviews</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {allReviews?.length}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +5.4%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            Average Rating: 4.6 ★
          </div>
          <div className="text-muted-foreground">
            Positive sentiment on UI and support
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}