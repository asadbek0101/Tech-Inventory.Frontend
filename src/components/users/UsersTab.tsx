import { useParams } from "react-router-dom";
import { TabPageType } from "../../api/AppDto";
import { UserFilter } from "../../filters/UserFIlter";
import { useQuery } from "../../hooks/useQuery";
import { useEffect, useMemo, useState } from "react";

import UsersFormWrapper from "./UsersFormWrapper";
import UsersTableWrapper from "./UsersTableWrapper";

export default function UsersTab() {
  const { tab = TabPageType.Table } = useParams();
  const query = useQuery();
  const filter = useMemo(() => new UserFilter(query), [query]);

  return (
    <>
      {tab === TabPageType.Table && <UsersTableWrapper filter={filter} />}
      {tab === TabPageType.Form && <UsersFormWrapper filter={filter} />}
    </>
  );
}
