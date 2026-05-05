import { Card, Row, Col } from "antd";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const columns = {
  todo: "Cần làm",
  doing: "Đang làm",
  done: "Hoàn thành",
};

export default function Board({ tasks, setTasks }) {
  const onDragEnd = (result) => {
    if (!result.destination) return;

    setTasks(tasks.map(t =>
      t.id === result.draggableId
        ? { ...t, status: result.destination.droppableId }
        : t
    ));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Row gutter={16}>
        {Object.keys(columns).map(col => (
          <Col span={8} key={col}>
            <Card title={columns[col]}>
              <Droppable droppableId={col}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {tasks.filter(t => t.status === col).map((t, i) => (
                      <Draggable key={t.id} draggableId={t.id} index={i}>
                        {(prov) => (
                          <div
                            ref={prov.innerRef}
                            {...prov.draggableProps}
                            {...prov.dragHandleProps}
                            style={{
                              padding: 10,
                              marginBottom: 10,
                              background: "#fff",
                              borderRadius: 6,
                              ...prov.draggableProps.style
                            }}
                          >
                            {t.title}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Card>
          </Col>
        ))}
      </Row>
    </DragDropContext>
  );
}