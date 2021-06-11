import { join } from "path";
import fs from "fs";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";
import { Map } from "../../components/Map";
import { ProjectLevel } from "../../components/ProjectLevel";

export default function ProjectTemplate({ project }: any) {
  console.log(project);
  const { data, content } = matter(project);
  const { title, pageName, subtitle, aim, centres, cities, targetSampleSize } =
    data;
  return (
    <Layout title={title} subtitle={subtitle} currentPageName={pageName}>
	<section className="section">
	    <ProjectLevel
              levelItems={[
		{ Centres: Object.keys(centres).length },
		{ Cities: cities },
		{ "Target Sample Size": targetSampleSize },
              ]}
	    />
	</section>
	<section className="section">
	    <div
	      className="container"
		style={{
		  maxWidth: "1000px"
		}}
	    >
		<figure className="image is-16by9">
		    <Map data={centres}/>
		</figure>
	    </div>
	</section>
	<section className="section">
	    <ReactMarkdown
	      components={
	      {
		h1({children}) {
		  return <h1 className="title">{children}</h1>
		}
	      }
	      }
	    >{content}</ReactMarkdown>
	</section>
    </Layout>
  );
}

const projectDir = join(process.cwd(), "_projects");

export async function getStaticProps(context: any) {
  const { params } = context;
  const project = fs.readFileSync(join(projectDir, params.id + ".md"), "utf8");
  return {
    props: { project },
  };
}

export async function getStaticPaths() {
  const paths = fs
    .readdirSync(projectDir)
    .map((path) => path.replace(".md", ""))
    .map((path) => {
      return { params: { id: path } };
    });
  return {
    paths: paths,
    fallback: false,
  };
}
