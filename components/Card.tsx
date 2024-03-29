import { TagList, TagInterface } from "./TagList";
import { ReactNode } from "react";

export interface CardInterface {
  tags?: TagInterface[] | "";
  title?: string;
  subtitle?: string;
  spacedTitle?: boolean;
  children?: ReactNode;
}

export function Card({
  tags = "",
  title = "",
  subtitle = "",
  spacedTitle = false,
  children,
}: CardInterface) {
  return (
    <article className="card" style={{ maxWidth: "500px", minWidth: "200px" }}>
      <div className="card-content">
        {tags !== "" && (
          <div className="content">
            <TagList tags={tags} />
          </div>
        )}
        {title !== "" && (
          <h3 className={`title is-4 ${spacedTitle && "is-spaced"}`}>
            {title}
          </h3>
        )}
        {subtitle !== "" && <h4 className="subtitle is-6">{subtitle}</h4>}
        {children}
      </div>
    </article>
  );
}
