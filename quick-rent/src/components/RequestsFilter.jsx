import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function RequestsFilter({ requestsStatus, showRequestsWithSpecificStatus }) {
  return (
    <div className="p-2 mt-5 mr-10 rounded-md bg-blue-500 hover:bg-blue-600 shadow-md self-end min-w-[120px] max-w-[180px] ml-auto">
      <DropdownMenu className="justify-end items-end">
        <DropdownMenuTrigger className="text-white w-full text-xl cursor-pointer pl-2 pr-2">
          {requestsStatus}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white text-[var(--text)] shadow-lg rounded-md min-w-[180px]">
          <DropdownMenuItem
            className="text-xl cursor-pointer hover:bg-blue-100"
            onClick={(e) => showRequestsWithSpecificStatus("All")}
          >
            All requests
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-xl cursor-pointer hover:bg-blue-100"
            onClick={(e) =>
              showRequestsWithSpecificStatus(
                e.currentTarget.textContent,
                "Pending"
              )
            }
          >
            Pending
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-xl cursor-pointer hover:bg-blue-100"
            onClick={(e) =>
              showRequestsWithSpecificStatus(
                e.currentTarget.textContent,
                "Rejected"
              )
            }
          >
            Rejected
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-xl cursor-pointer hover:bg-blue-100"
            onClick={(e) =>
              showRequestsWithSpecificStatus(
                e.currentTarget.textContent,
                "Approved"
              )
            }
          >
            Approved
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default RequestsFilter;
