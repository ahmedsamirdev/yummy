import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

import Card from "../components/Card";

export default function RecipeCard({ recipe }) {
  return (
    <>
      <Card recipe={recipe} />
    </>
  );
}
