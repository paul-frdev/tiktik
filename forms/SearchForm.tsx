import React, { useState } from "react";
import { Button } from "components/Elements/Button";
import { BiSearch } from "react-icons/bi";
import { useRouter } from "next/router";

export const SearchForm = () => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleSearch = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };

  return (
    <div className="search-form">
      <form className="search-form__form" onSubmit={handleSearch}>
        <input
          className="search-form__input"
          type="text"
          onChange={(event: any) => setSearchValue(event.target.value)}
          value={searchValue}
          placeholder="Search"
        />
        {searchValue.length > 0 && (
          <Button className="search-form__button" onClick={handleSearch}>
            <BiSearch className="search-form__icon" />
          </Button>
        )}
      </form>
    </div>
  );
};
