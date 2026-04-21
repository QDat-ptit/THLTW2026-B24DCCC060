import { useParams, history } from 'umi';
import { Button, Tag } from 'antd';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Detail() {
  const { id } = useParams<any>();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    const p = {
      id,
      title: 'Demo bài viết',
      content: '# Hello Markdown \n Nội dung demo',
      tags: ['react'],
      views: 1,
    };

    setPost(p);
  }, [id]);

  if (!post) return null;

  return (
    <div style={{ padding: 20 }}>
      <h1>{post.title}</h1>

      {post.tags.map((t: string, i: number) => (
        <Tag key={i}>{t}</Tag>
      ))}

      <ReactMarkdown>{post.content}</ReactMarkdown>

      <p>Views: {post.views}</p>

      <Button onClick={() => history.push('/blog')}>
        Quay lại
      </Button>
    </div>
  );
}