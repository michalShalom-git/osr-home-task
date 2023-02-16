import dayjs from "dayjs";

export function formatDate(articals){
    return articals.map((article)=>{
        article.publishedAt = dayjs(article.publishedAt).format("DD-MM-YYYY");
        return article;
    })
}

