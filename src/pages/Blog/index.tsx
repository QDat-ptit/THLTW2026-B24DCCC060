import { Card, Row, Col, Tag, Input, Pagination } from 'antd';
import { useState, useEffect } from 'react';
import { history } from 'umi';

export default function Blog() {
  const [data] = useState<any[]>([
    {
      id: 1,
      title: 'React cơ bản',
      summary: 'Học React từ đầu',
      image: 'https://picsum.photos/300',
      tags: ['react'],
      author: 'Dat',
      date: '2026',
    },
    {
      id: 2,
      title: 'NodeJS',
      summary: 'Backend cơ bản',
      image: 'https://picsum.photos/301',
      tags: ['node'],
      author: 'Dat',
      date: '2026',
    },
  ]);

  const [search, setSearch] = useState('');
  const [tag, setTag] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => {}, 300);
    return () => clearTimeout(t);
  }, [search]);

  const filtered = data
    .filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase()),
    )
    .filter((p) => (tag ? p.tags.includes(tag) : true));

  const pageData = filtered.slice((page - 1) * 9, page * 9);

  return (
    <div style={{ padding: 20 }}>
      <Input
        placeholder="Tìm kiếm..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <Row gutter={16} style={{ marginTop: 20 }}>
        {pageData.map((p) => (
          <Col span={8} key={p.id}>
            <Card
              cover={<img src={p.image} />}
              onClick={() =>
                history.push(`/blog/detail/${p.id}`)
              }
            >
              <h3>{p.title}</h3>
              <p>{p.summary}</p>

              {p.tags.map((t: string) => (
                <Tag onClick={() => setTag(t)}>{t}</Tag>
              ))}
            </Card>
          </Col>
        ))}
      </Row>

      <Pagination
        current={page}
        total={filtered.length}
        pageSize={9}
        onChange={setPage}
      />
    </div>
  );
}