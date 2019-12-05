import React, { useState } from "react";
import { Label, Table, Pagination, Button, Icon } from "semantic-ui-react";
 
import DisplayDate from "../DisplayDate";
import { FormattedMessage } from "react-intl";
import { colors } from "../../utils/constants";
 
import CommandModal from "./CommandModal";

function SubcatList({ data, take, total, activePage, onPageChange }) {
  const [command, setCommand] = useState({});
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Table size="small">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>reference</Table.HeaderCell>
            <Table.HeaderCell>restaurant</Table.HeaderCell>
            <Table.HeaderCell>
              <FormattedMessage id="price" />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        {data && data.length && (
          <Table.Body>
            {data.map(d => (
              <Table.Row key={d.id}>
                <Table.Cell>
                  <Label>{d.reference}</Label>
                </Table.Cell>

                <Table.Cell>
                  <Label>{d.company_name}</Label>
                </Table.Cell>
                <Table.Cell>
                  <Label>{d.price}</Label>
                </Table.Cell>

                
                <Table.Cell>
                  <Label size="tiny">
                    <DisplayDate date={d.created_at} />
                  </Label>
                </Table.Cell>

                <Table.Cell style={{ fontSize: 10 }}>
                  <Button
                    icon="pencil alternate"
                    style={{ fontSize: 10, color: colors.VIOLET }}
                    size="small"
                  />
                </Table.Cell>
                <Table.Cell style={{ fontSize: 10 }}>
                  <Button
                    icon="eye"
                    style={{ fontSize: 10, color: colors.VIOLET }}
                    size="small"
                    onClick={async () => {
                      await setCommand(d);
                      await setOpen(true);
                    }}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        )}
      </Table>
      <Pagination
        defaultActivePage={activePage}
        totalPages={Math.ceil(total / take)}
        onPageChange={async (e, data) => {
          e.preventDefault();
          const { activePage } = data;
          const skipper = (activePage - 1) * take - 1;
          await onPageChange({
            activePage,
            skip: skipper > 0 ? skipper : 0,
            take
          });
        }}
      />

      <CommandModal
        command={command}
        open={open}
        cancel={async () => {
          await setOpen(false);
        }}
      />
    </div>
  );
}

export default SubcatList;
