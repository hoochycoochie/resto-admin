import React from "react";
import { Label, Table, Pagination, Image } from "semantic-ui-react";
import DisplayDate from "../DisplayDate";
import { FormattedMessage } from "react-intl";

function TeamList({ data, take, total, activePage, onPageChange }) {
  return (
    <div>
      <Table size="small">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <FormattedMessage id="name" />
            </Table.HeaderCell>

            <Table.HeaderCell singleLine>
              <FormattedMessage id="lastname" />
            </Table.HeaderCell>
            <Table.HeaderCell>
              <FormattedMessage id="phone" />
            </Table.HeaderCell>
            <Table.HeaderCell>
              <FormattedMessage id="email" />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        {data && data.length && (
          <Table.Body>
            {data.map(d => (
              <Table.Row key={d.id}>
                <Table.Cell>
                  <Label>{d.name}</Label>
                </Table.Cell>
                <Table.Cell>
                  <Label>{d.lastname}</Label>
                </Table.Cell>

                <Table.Cell>
                  <Label>{d.email}</Label>
                </Table.Cell>
                <Table.Cell>
                  <Label>{d.phone}</Label>
                </Table.Cell>

                <Table.Cell>
                  <Image size="tiny" src={d.picture} />
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
    </div>
  );
}

export default TeamList;
