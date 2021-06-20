import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

import Card from "../components/Card";
export default function RecipeCard({ recipe }) {
  return (
    <div className="grid grid-cols-1 grid-flow-rows gap-8 md:grid-rows-1 mx-2 lg:grid-rows-1">
      <Card recipe={recipe} />
    </div>
  );
}
