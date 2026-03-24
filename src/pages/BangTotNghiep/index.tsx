import { Tabs } from 'antd';
import { useState } from 'react';

import SoManager from './SoManager';
import DecisionManager from './DecisionManager';
import CauHinh from './CauHinh';
import CertificateManager from './CertificateManager';
import TraCuu from './TraCuu';

const { TabPane } = Tabs;

export default () => {
  const [books, setBooks] = useState<any[]>([]);
  const [decisions, setDecisions] = useState<any[]>([]);
  const [fields, setFields] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);

  return (
    <Tabs defaultActiveKey="1">

      <TabPane tab="Sổ văn bằng" key="1">
        <SoManager books={books} setBooks={setBooks} />
      </TabPane>

      <TabPane tab="Quyết định" key="2">
        <DecisionManager
          books={books}
          decisions={decisions}
          setDecisions={setDecisions}
        />
      </TabPane>

      <TabPane tab="Cấu hình" key="3">
        <CauHinh fields={fields} setFields={setFields} />
      </TabPane>

      <TabPane tab="Văn bằng" key="4">
        <CertificateManager
          books={books}
          setBooks={setBooks}
          decisions={decisions}
          fields={fields}
          certificates={certificates}
          setCertificates={setCertificates}
        />
      </TabPane>

      <TabPane tab="Tra cứu" key="5">
        <TraCuu
          certificates={certificates}
          decisions={decisions}
          setDecisions={setDecisions}
        />
      </TabPane>

    </Tabs>
  );
};