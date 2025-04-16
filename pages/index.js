import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProduct from "@/components/NewProduct";
import Product from "@/lib/models/Product";
import { mongooseConnect } from "@/lib/mongoose";

export default function HomePage({ featuredproduct, newProducts }) {
  console.log(newProducts);
  return (
    <div>
      <Header />
      <Featured product={featuredproduct} />
      <NewProduct products={newProducts} />
    </div>
  );
}
export async function getServerSideProps() {
  const featuredProductId = "67ff2fd8d973fc2a26f7aafd";
  await mongooseConnect();
  const featuredproduct = await Product.findById(featuredProductId);
  const newProduct = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });
  return {
    props: {
      featuredproduct: JSON.parse(JSON.stringify(featuredproduct)),
      newProducts: JSON.parse(JSON.stringify(newProduct)),
    },
  };
}
