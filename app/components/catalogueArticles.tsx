"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const product = [
  {
    id: 1,
    image:
      "https://s3-alpha-sig.figma.com/img/77dc/ef27/f709147be988a17e8f90413ec520b056?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=RycZ3mbYy4mzvVleXm03oXSVWj7YPmZWaDZMWk3oad1wxbz~5pVBEdM-bSc4sJQe3zbD7DHO54y4tTftYtTJ8nQtCaZeXSLThjJkA6xDiiWnOQHpoFZmiiLYCnk804kHSu0~FWD0vRnnwCPJ4T9Krer1v9NxssFuSe8vwmtwVo34Ts010pJCH~TRDcSVC-CP1np4YDPnFqgl51q5H3MXDEdsiBsGPkEvFKevpmTymF~XmjeHWE-eIgwWMdc33RApUXGmvFXGeH7b4qWQVX7CaKGjMTsH4XWjKuBQ5oEnxxcWicFXo~lox4WclJlVv0ZsuQlUnTcm81MXQcqsTYUQqg__",
    price: "10 DT",
    title: "Lorem ipsum 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor quam ut dui aliquam",
  },
  {
    id: 2,
    image:
      "https://s3-alpha-sig.figma.com/img/eb97/b578/d7632ea1786432ea864388c18dcbc66c?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=T9sOSi5em3kvaF1XMGZKssILFuk5PG~2swZy2CNIYJIhJwgXp5i1dVeDjxHK24xZQV3WmH6ia4ljJpHm0Oxh7vNUqSbMDOXq1bCNBp0MCl~rjkGUSer9lglFEMxSOKY8a4a8xQXFAZSg9LofcBJpLILoAffOPbHOihobDcWYGst9mfxLjWJyMsbrUyjSlLCRtcD2suoCHZiAXm9QvKN9oPa19SVtKAmi4E6jrRg1hUAUd-J66~zAWEEK5E7PZItzf-Eo4leOTjUcaWrQyBC6X5tGQSs7Wqhtg5Wr04KkO5Liimy19LuO0hUQ1XU7HJ9LOD1MmuwFH4LiTGgT5S~H6g__",
    price: "25 DT",
    title: "Lorem ipsum 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor quam ut dui aliquam",
  },
  {
    id: 3,
    image:
      "https://s3-alpha-sig.figma.com/img/6fa8/f8cc/3661339c6c98c2bd9e5f10ecc65d76f3?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hDhGrKiBxtCnYMxVzaVnOVTX2~Ih6ZJ6q96Z757H9yI01IrC7t6Eh8F3vYdAyYH65cSgl3Pqcq9jEYuRZezDNzFZ4XkWzD4JqShEdsi8F21gH~uQg6Tlb9kjxUJDNFgPON0y18QS-CGwZCB-~e7XxeeRSoq5R5G3yOI5eDuK7MOHMmSmKCNkcRX7P2qvjQCBHQ9tzmFL6oyV~MI91Gre6KJ7VL64JiBL0TxK7ccV7BED~jTnPXbr6TWo4OHbHV4gLrmo6R71lic6jLJKbD8XOeqDZEFB3JXVYgVL7GfP8t74-KOBYBrFiQqOrNCjJ4tOB6~K~p3MPJFhTLtpkxW~4A__",
    price: "25 DT",
    title: "Lorem ipsum 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor quam ut dui aliquam",
  },
  {
    id: 4,
    image:
      "https://s3-alpha-sig.figma.com/img/6fa8/f8cc/3661339c6c98c2bd9e5f10ecc65d76f3?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hDhGrKiBxtCnYMxVzaVnOVTX2~Ih6ZJ6q96Z757H9yI01IrC7t6Eh8F3vYdAyYH65cSgl3Pqcq9jEYuRZezDNzFZ4XkWzD4JqShEdsi8F21gH~uQg6Tlb9kjxUJDNFgPON0y18QS-CGwZCB-~e7XxeeRSoq5R5G3yOI5eDuK7MOHMmSmKCNkcRX7P2qvjQCBHQ9tzmFL6oyV~MI91Gre6KJ7VL64JiBL0TxK7ccV7BED~jTnPXbr6TWo4OHbHV4gLrmo6R71lic6jLJKbD8XOeqDZEFB3JXVYgVL7GfP8t74-KOBYBrFiQqOrNCjJ4tOB6~K~p3MPJFhTLtpkxW~4A__",
    price: "25 DT",
    title: "Lorem ipsum 4",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor quam ut dui aliquam",
  },
  {
    id: 5,
    image:
      "https://s3-alpha-sig.figma.com/img/77dc/ef27/f709147be988a17e8f90413ec520b056?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=RycZ3mbYy4mzvVleXm03oXSVWj7YPmZWaDZMWk3oad1wxbz~5pVBEdM-bSc4sJQe3zbD7DHO54y4tTftYtTJ8nQtCaZeXSLThjJkA6xDiiWnOQHpoFZmiiLYCnk804kHSu0~FWD0vRnnwCPJ4T9Krer1v9NxssFuSe8vwmtwVo34Ts010pJCH~TRDcSVC-CP1np4YDPnFqgl51q5H3MXDEdsiBsGPkEvFKevpmTymF~XmjeHWE-eIgwWMdc33RApUXGmvFXGeH7b4qWQVX7CaKGjMTsH4XWjKuBQ5oEnxxcWicFXo~lox4WclJlVv0ZsuQlUnTcm81MXQcqsTYUQqg__",
    price: "10 DT",
    title: "Lorem ipsum 5",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor quam ut dui aliquam",
  },
  {
    id: 6,
    image:
      "https://s3-alpha-sig.figma.com/img/eb97/b578/d7632ea1786432ea864388c18dcbc66c?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=T9sOSi5em3kvaF1XMGZKssILFuk5PG~2swZy2CNIYJIhJwgXp5i1dVeDjxHK24xZQV3WmH6ia4ljJpHm0Oxh7vNUqSbMDOXq1bCNBp0MCl~rjkGUSer9lglFEMxSOKY8a4a8xQXFAZSg9LofcBJpLILoAffOPbHOihobDcWYGst9mfxLjWJyMsbrUyjSlLCRtcD2suoCHZiAXm9QvKN9oPa19SVtKAmi4E6jrRg1hUAUd-J66~zAWEEK5E7PZItzf-Eo4leOTjUcaWrQyBC6X5tGQSs7Wqhtg5Wr04KkO5Liimy19LuO0hUQ1XU7HJ9LOD1MmuwFH4LiTGgT5S~H6g__",
    price: "25 DT",
    title: "Lorem ipsum 6",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor quam ut dui aliquam",
  },
  {
    id: 7,
    image:
      "https://s3-alpha-sig.figma.com/img/6fa8/f8cc/3661339c6c98c2bd9e5f10ecc65d76f3?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hDhGrKiBxtCnYMxVzaVnOVTX2~Ih6ZJ6q96Z757H9yI01IrC7t6Eh8F3vYdAyYH65cSgl3Pqcq9jEYuRZezDNzFZ4XkWzD4JqShEdsi8F21gH~uQg6Tlb9kjxUJDNFgPON0y18QS-CGwZCB-~e7XxeeRSoq5R5G3yOI5eDuK7MOHMmSmKCNkcRX7P2qvjQCBHQ9tzmFL6oyV~MI91Gre6KJ7VL64JiBL0TxK7ccV7BED~jTnPXbr6TWo4OHbHV4gLrmo6R71lic6jLJKbD8XOeqDZEFB3JXVYgVL7GfP8t74-KOBYBrFiQqOrNCjJ4tOB6~K~p3MPJFhTLtpkxW~4A__",
    price: "25 DT",
    title: "Lorem ipsum 7",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor quam ut dui aliquam",
  },
  {
    id: 8,
    image:
      "https://s3-alpha-sig.figma.com/img/6fa8/f8cc/3661339c6c98c2bd9e5f10ecc65d76f3?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hDhGrKiBxtCnYMxVzaVnOVTX2~Ih6ZJ6q96Z757H9yI01IrC7t6Eh8F3vYdAyYH65cSgl3Pqcq9jEYuRZezDNzFZ4XkWzD4JqShEdsi8F21gH~uQg6Tlb9kjxUJDNFgPON0y18QS-CGwZCB-~e7XxeeRSoq5R5G3yOI5eDuK7MOHMmSmKCNkcRX7P2qvjQCBHQ9tzmFL6oyV~MI91Gre6KJ7VL64JiBL0TxK7ccV7BED~jTnPXbr6TWo4OHbHV4gLrmo6R71lic6jLJKbD8XOeqDZEFB3JXVYgVL7GfP8t74-KOBYBrFiQqOrNCjJ4tOB6~K~p3MPJFhTLtpkxW~4A__",
    price: "25 DT",
    title: "Lorem ipsum 8",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor quam ut dui aliquam",
  },
  {
    id: 9,
    image:
      "https://s3-alpha-sig.figma.com/img/77dc/ef27/f709147be988a17e8f90413ec520b056?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=RycZ3mbYy4mzvVleXm03oXSVWj7YPmZWaDZMWk3oad1wxbz~5pVBEdM-bSc4sJQe3zbD7DHO54y4tTftYtTJ8nQtCaZeXSLThjJkA6xDiiWnOQHpoFZmiiLYCnk804kHSu0~FWD0vRnnwCPJ4T9Krer1v9NxssFuSe8vwmtwVo34Ts010pJCH~TRDcSVC-CP1np4YDPnFqgl51q5H3MXDEdsiBsGPkEvFKevpmTymF~XmjeHWE-eIgwWMdc33RApUXGmvFXGeH7b4qWQVX7CaKGjMTsH4XWjKuBQ5oEnxxcWicFXo~lox4WclJlVv0ZsuQlUnTcm81MXQcqsTYUQqg__",
    price: "10 DT",
    title: "Lorem ipsum 9",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor quam ut dui aliquam",
  },
  {
    id: 10,
    image:
      "https://s3-alpha-sig.figma.com/img/eb97/b578/d7632ea1786432ea864388c18dcbc66c?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=T9sOSi5em3kvaF1XMGZKssILFuk5PG~2swZy2CNIYJIhJwgXp5i1dVeDjxHK24xZQV3WmH6ia4ljJpHm0Oxh7vNUqSbMDOXq1bCNBp0MCl~rjkGUSer9lglFEMxSOKY8a4a8xQXFAZSg9LofcBJpLILoAffOPbHOihobDcWYGst9mfxLjWJyMsbrUyjSlLCRtcD2suoCHZiAXm9QvKN9oPa19SVtKAmi4E6jrRg1hUAUd-J66~zAWEEK5E7PZItzf-Eo4leOTjUcaWrQyBC6X5tGQSs7Wqhtg5Wr04KkO5Liimy19LuO0hUQ1XU7HJ9LOD1MmuwFH4LiTGgT5S~H6g__",
    price: "25 DT",
    title: "Lorem ipsum 10",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor quam ut dui aliquam",
  },
  {
    id: 11,
    image:
      "https://s3-alpha-sig.figma.com/img/6fa8/f8cc/3661339c6c98c2bd9e5f10ecc65d76f3?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hDhGrKiBxtCnYMxVzaVnOVTX2~Ih6ZJ6q96Z757H9yI01IrC7t6Eh8F3vYdAyYH65cSgl3Pqcq9jEYuRZezDNzFZ4XkWzD4JqShEdsi8F21gH~uQg6Tlb9kjxUJDNFgPON0y18QS-CGwZCB-~e7XxeeRSoq5R5G3yOI5eDuK7MOHMmSmKCNkcRX7P2qvjQCBHQ9tzmFL6oyV~MI91Gre6KJ7VL64JiBL0TxK7ccV7BED~jTnPXbr6TWo4OHbHV4gLrmo6R71lic6jLJKbD8XOeqDZEFB3JXVYgVL7GfP8t74-KOBYBrFiQqOrNCjJ4tOB6~K~p3MPJFhTLtpkxW~4A__",
    price: "25 DT",
    title: "Lorem ipsum 11",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor quam ut dui aliquam",
  },
  {
    id: 12,
    image:
      "https://s3-alpha-sig.figma.com/img/6fa8/f8cc/3661339c6c98c2bd9e5f10ecc65d76f3?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hDhGrKiBxtCnYMxVzaVnOVTX2~Ih6ZJ6q96Z757H9yI01IrC7t6Eh8F3vYdAyYH65cSgl3Pqcq9jEYuRZezDNzFZ4XkWzD4JqShEdsi8F21gH~uQg6Tlb9kjxUJDNFgPON0y18QS-CGwZCB-~e7XxeeRSoq5R5G3yOI5eDuK7MOHMmSmKCNkcRX7P2qvjQCBHQ9tzmFL6oyV~MI91Gre6KJ7VL64JiBL0TxK7ccV7BED~jTnPXbr6TWo4OHbHV4gLrmo6R71lic6jLJKbD8XOeqDZEFB3JXVYgVL7GfP8t74-KOBYBrFiQqOrNCjJ4tOB6~K~p3MPJFhTLtpkxW~4A__",
    price: "25 DT",
    title: "Lorem ipsum 12",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor quam ut dui aliquam",
  },
  {
    id: 13,
    image:
      "https://s3-alpha-sig.figma.com/img/77dc/ef27/f709147be988a17e8f90413ec520b056?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=RycZ3mbYy4mzvVleXm03oXSVWj7YPmZWaDZMWk3oad1wxbz~5pVBEdM-bSc4sJQe3zbD7DHO54y4tTftYtTJ8nQtCaZeXSLThjJkA6xDiiWnOQHpoFZmiiLYCnk804kHSu0~FWD0vRnnwCPJ4T9Krer1v9NxssFuSe8vwmtwVo34Ts010pJCH~TRDcSVC-CP1np4YDPnFqgl51q5H3MXDEdsiBsGPkEvFKevpmTymF~XmjeHWE-eIgwWMdc33RApUXGmvFXGeH7b4qWQVX7CaKGjMTsH4XWjKuBQ5oEnxxcWicFXo~lox4WclJlVv0ZsuQlUnTcm81MXQcqsTYUQqg__",
    price: "10 DT",
    title: "Lorem ipsum 13",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor quam ut dui aliquam",
  },
  {
    id: 14,
    image:
      "https://s3-alpha-sig.figma.com/img/eb97/b578/d7632ea1786432ea864388c18dcbc66c?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=T9sOSi5em3kvaF1XMGZKssILFuk5PG~2swZy2CNIYJIhJwgXp5i1dVeDjxHK24xZQV3WmH6ia4ljJpHm0Oxh7vNUqSbMDOXq1bCNBp0MCl~rjkGUSer9lglFEMxSOKY8a4a8xQXFAZSg9LofcBJpLILoAffOPbHOihobDcWYGst9mfxLjWJyMsbrUyjSlLCRtcD2suoCHZiAXm9QvKN9oPa19SVtKAmi4E6jrRg1hUAUd-J66~zAWEEK5E7PZItzf-Eo4leOTjUcaWrQyBC6X5tGQSs7Wqhtg5Wr04KkO5Liimy19LuO0hUQ1XU7HJ9LOD1MmuwFH4LiTGgT5S~H6g__",
    price: "25 DT",
    title: "Lorem ipsum 14",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor quam ut dui aliquam",
  },
  {
    id: 15,
    image:
      "https://s3-alpha-sig.figma.com/img/6fa8/f8cc/3661339c6c98c2bd9e5f10ecc65d76f3?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hDhGrKiBxtCnYMxVzaVnOVTX2~Ih6ZJ6q96Z757H9yI01IrC7t6Eh8F3vYdAyYH65cSgl3Pqcq9jEYuRZezDNzFZ4XkWzD4JqShEdsi8F21gH~uQg6Tlb9kjxUJDNFgPON0y18QS-CGwZCB-~e7XxeeRSoq5R5G3yOI5eDuK7MOHMmSmKCNkcRX7P2qvjQCBHQ9tzmFL6oyV~MI91Gre6KJ7VL64JiBL0TxK7ccV7BED~jTnPXbr6TWo4OHbHV4gLrmo6R71lic6jLJKbD8XOeqDZEFB3JXVYgVL7GfP8t74-KOBYBrFiQqOrNCjJ4tOB6~K~p3MPJFhTLtpkxW~4A__",
    price: "25 DT",
    title: "Lorem ipsum 15",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor quam ut dui aliquam",
  },
  {
    id: 16,
    image:
      "https://s3-alpha-sig.figma.com/img/6fa8/f8cc/3661339c6c98c2bd9e5f10ecc65d76f3?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hDhGrKiBxtCnYMxVzaVnOVTX2~Ih6ZJ6q96Z757H9yI01IrC7t6Eh8F3vYdAyYH65cSgl3Pqcq9jEYuRZezDNzFZ4XkWzD4JqShEdsi8F21gH~uQg6Tlb9kjxUJDNFgPON0y18QS-CGwZCB-~e7XxeeRSoq5R5G3yOI5eDuK7MOHMmSmKCNkcRX7P2qvjQCBHQ9tzmFL6oyV~MI91Gre6KJ7VL64JiBL0TxK7ccV7BED~jTnPXbr6TWo4OHbHV4gLrmo6R71lic6jLJKbD8XOeqDZEFB3JXVYgVL7GfP8t74-KOBYBrFiQqOrNCjJ4tOB6~K~p3MPJFhTLtpkxW~4A__",
    price: "25 DT",
    title: "Lorem ipsum 16",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor quam ut dui aliquam",
  },
  {
    id: 17,
    image:
      "https://s3-alpha-sig.figma.com/img/77dc/ef27/f709147be988a17e8f90413ec520b056?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=RycZ3mbYy4mzvVleXm03oXSVWj7YPmZWaDZMWk3oad1wxbz~5pVBEdM-bSc4sJQe3zbD7DHO54y4tTftYtTJ8nQtCaZeXSLThjJkA6xDiiWnOQHpoFZmiiLYCnk804kHSu0~FWD0vRnnwCPJ4T9Krer1v9NxssFuSe8vwmtwVo34Ts010pJCH~TRDcSVC-CP1np4YDPnFqgl51q5H3MXDEdsiBsGPkEvFKevpmTymF~XmjeHWE-eIgwWMdc33RApUXGmvFXGeH7b4qWQVX7CaKGjMTsH4XWjKuBQ5oEnxxcWicFXo~lox4WclJlVv0ZsuQlUnTcm81MXQcqsTYUQqg__",
    price: "10 DT",
    title: "Lorem ipsum 17",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor quam ut dui aliquam",
  },
  {
    id: 18,
    image:
      "https://s3-alpha-sig.figma.com/img/eb97/b578/d7632ea1786432ea864388c18dcbc66c?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=T9sOSi5em3kvaF1XMGZKssILFuk5PG~2swZy2CNIYJIhJwgXp5i1dVeDjxHK24xZQV3WmH6ia4ljJpHm0Oxh7vNUqSbMDOXq1bCNBp0MCl~rjkGUSer9lglFEMxSOKY8a4a8xQXFAZSg9LofcBJpLILoAffOPbHOihobDcWYGst9mfxLjWJyMsbrUyjSlLCRtcD2suoCHZiAXm9QvKN9oPa19SVtKAmi4E6jrRg1hUAUd-J66~zAWEEK5E7PZItzf-Eo4leOTjUcaWrQyBC6X5tGQSs7Wqhtg5Wr04KkO5Liimy19LuO0hUQ1XU7HJ9LOD1MmuwFH4LiTGgT5S~H6g__",
    price: "25 DT",
    title: "Lorem ipsum 18",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor quam ut dui aliquam",
  },
  {
    id: 19,
    image:
      "https://s3-alpha-sig.figma.com/img/6fa8/f8cc/3661339c6c98c2bd9e5f10ecc65d76f3?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hDhGrKiBxtCnYMxVzaVnOVTX2~Ih6ZJ6q96Z757H9yI01IrC7t6Eh8F3vYdAyYH65cSgl3Pqcq9jEYuRZezDNzFZ4XkWzD4JqShEdsi8F21gH~uQg6Tlb9kjxUJDNFgPON0y18QS-CGwZCB-~e7XxeeRSoq5R5G3yOI5eDuK7MOHMmSmKCNkcRX7P2qvjQCBHQ9tzmFL6oyV~MI91Gre6KJ7VL64JiBL0TxK7ccV7BED~jTnPXbr6TWo4OHbHV4gLrmo6R71lic6jLJKbD8XOeqDZEFB3JXVYgVL7GfP8t74-KOBYBrFiQqOrNCjJ4tOB6~K~p3MPJFhTLtpkxW~4A__",
    price: "25 DT",
    title: "Lorem ipsum 19",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor quam ut dui aliquam",
  },
  {
    id: 20,
    image:
      "https://s3-alpha-sig.figma.com/img/6fa8/f8cc/3661339c6c98c2bd9e5f10ecc65d76f3?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hDhGrKiBxtCnYMxVzaVnOVTX2~Ih6ZJ6q96Z757H9yI01IrC7t6Eh8F3vYdAyYH65cSgl3Pqcq9jEYuRZezDNzFZ4XkWzD4JqShEdsi8F21gH~uQg6Tlb9kjxUJDNFgPON0y18QS-CGwZCB-~e7XxeeRSoq5R5G3yOI5eDuK7MOHMmSmKCNkcRX7P2qvjQCBHQ9tzmFL6oyV~MI91Gre6KJ7VL64JiBL0TxK7ccV7BED~jTnPXbr6TWo4OHbHV4gLrmo6R71lic6jLJKbD8XOeqDZEFB3JXVYgVL7GfP8t74-KOBYBrFiQqOrNCjJ4tOB6~K~p3MPJFhTLtpkxW~4A__",
    price: "25 DT",
    title: "Lorem ipsum 20",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor quam ut dui aliquam",
  },
  {
    id: 21,
    image:
      "https://s3-alpha-sig.figma.com/img/77dc/ef27/f709147be988a17e8f90413ec520b056?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=RycZ3mbYy4mzvVleXm03oXSVWj7YPmZWaDZMWk3oad1wxbz~5pVBEdM-bSc4sJQe3zbD7DHO54y4tTftYtTJ8nQtCaZeXSLThjJkA6xDiiWnOQHpoFZmiiLYCnk804kHSu0~FWD0vRnnwCPJ4T9Krer1v9NxssFuSe8vwmtwVo34Ts010pJCH~TRDcSVC-CP1np4YDPnFqgl51q5H3MXDEdsiBsGPkEvFKevpmTymF~XmjeHWE-eIgwWMdc33RApUXGmvFXGeH7b4qWQVX7CaKGjMTsH4XWjKuBQ5oEnxxcWicFXo~lox4WclJlVv0ZsuQlUnTcm81MXQcqsTYUQqg__",
    price: "10 DT",
    title: "Lorem ipsum 21",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor quam ut dui aliquam",
  },
  {
    id: 22,
    image:
      "https://s3-alpha-sig.figma.com/img/eb97/b578/d7632ea1786432ea864388c18dcbc66c?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=T9sOSi5em3kvaF1XMGZKssILFuk5PG~2swZy2CNIYJIhJwgXp5i1dVeDjxHK24xZQV3WmH6ia4ljJpHm0Oxh7vNUqSbMDOXq1bCNBp0MCl~rjkGUSer9lglFEMxSOKY8a4a8xQXFAZSg9LofcBJpLILoAffOPbHOihobDcWYGst9mfxLjWJyMsbrUyjSlLCRtcD2suoCHZiAXm9QvKN9oPa19SVtKAmi4E6jrRg1hUAUd-J66~zAWEEK5E7PZItzf-Eo4leOTjUcaWrQyBC6X5tGQSs7Wqhtg5Wr04KkO5Liimy19LuO0hUQ1XU7HJ9LOD1MmuwFH4LiTGgT5S~H6g__",
    price: "25 DT",
    title: "Lorem ipsum 22",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor quam ut dui aliquam",
  },
  {
    id: 23,
    image:
      "https://s3-alpha-sig.figma.com/img/6fa8/f8cc/3661339c6c98c2bd9e5f10ecc65d76f3?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hDhGrKiBxtCnYMxVzaVnOVTX2~Ih6ZJ6q96Z757H9yI01IrC7t6Eh8F3vYdAyYH65cSgl3Pqcq9jEYuRZezDNzFZ4XkWzD4JqShEdsi8F21gH~uQg6Tlb9kjxUJDNFgPON0y18QS-CGwZCB-~e7XxeeRSoq5R5G3yOI5eDuK7MOHMmSmKCNkcRX7P2qvjQCBHQ9tzmFL6oyV~MI91Gre6KJ7VL64JiBL0TxK7ccV7BED~jTnPXbr6TWo4OHbHV4gLrmo6R71lic6jLJKbD8XOeqDZEFB3JXVYgVL7GfP8t74-KOBYBrFiQqOrNCjJ4tOB6~K~p3MPJFhTLtpkxW~4A__",
    price: "25 DT",
    title: "Lorem ipsum 23",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor quam ut dui aliquam",
  },
  {
    id: 24,
    image:
      "https://s3-alpha-sig.figma.com/img/6fa8/f8cc/3661339c6c98c2bd9e5f10ecc65d76f3?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hDhGrKiBxtCnYMxVzaVnOVTX2~Ih6ZJ6q96Z757H9yI01IrC7t6Eh8F3vYdAyYH65cSgl3Pqcq9jEYuRZezDNzFZ4XkWzD4JqShEdsi8F21gH~uQg6Tlb9kjxUJDNFgPON0y18QS-CGwZCB-~e7XxeeRSoq5R5G3yOI5eDuK7MOHMmSmKCNkcRX7P2qvjQCBHQ9tzmFL6oyV~MI91Gre6KJ7VL64JiBL0TxK7ccV7BED~jTnPXbr6TWo4OHbHV4gLrmo6R71lic6jLJKbD8XOeqDZEFB3JXVYgVL7GfP8t74-KOBYBrFiQqOrNCjJ4tOB6~K~p3MPJFhTLtpkxW~4A__",
    price: "25 DT",
    title: "Lorem ipsum 24",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor quam ut dui aliquam",
  },
  {
    id: 25,
    image:
      "https://s3-alpha-sig.figma.com/img/77dc/ef27/f709147be988a17e8f90413ec520b056?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=RycZ3mbYy4mzvVleXm03oXSVWj7YPmZWaDZMWk3oad1wxbz~5pVBEdM-bSc4sJQe3zbD7DHO54y4tTftYtTJ8nQtCaZeXSLThjJkA6xDiiWnOQHpoFZmiiLYCnk804kHSu0~FWD0vRnnwCPJ4T9Krer1v9NxssFuSe8vwmtwVo34Ts010pJCH~TRDcSVC-CP1np4YDPnFqgl51q5H3MXDEdsiBsGPkEvFKevpmTymF~XmjeHWE-eIgwWMdc33RApUXGmvFXGeH7b4qWQVX7CaKGjMTsH4XWjKuBQ5oEnxxcWicFXo~lox4WclJlVv0ZsuQlUnTcm81MXQcqsTYUQqg__",
    price: "10 DT",
    title: "Lorem ipsum 25",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor quam ut dui aliquam",
  },
  {
    id: 26,
    image:
      "https://s3-alpha-sig.figma.com/img/eb97/b578/d7632ea1786432ea864388c18dcbc66c?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=T9sOSi5em3kvaF1XMGZKssILFuk5PG~2swZy2CNIYJIhJwgXp5i1dVeDjxHK24xZQV3WmH6ia4ljJpHm0Oxh7vNUqSbMDOXq1bCNBp0MCl~rjkGUSer9lglFEMxSOKY8a4a8xQXFAZSg9LofcBJpLILoAffOPbHOihobDcWYGst9mfxLjWJyMsbrUyjSlLCRtcD2suoCHZiAXm9QvKN9oPa19SVtKAmi4E6jrRg1hUAUd-J66~zAWEEK5E7PZItzf-Eo4leOTjUcaWrQyBC6X5tGQSs7Wqhtg5Wr04KkO5Liimy19LuO0hUQ1XU7HJ9LOD1MmuwFH4LiTGgT5S~H6g__",
    price: "25 DT",
    title: "Lorem ipsum 26",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor quam ut dui aliquam",
  },
  {
    id: 27,
    image:
      "https://s3-alpha-sig.figma.com/img/6fa8/f8cc/3661339c6c98c2bd9e5f10ecc65d76f3?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hDhGrKiBxtCnYMxVzaVnOVTX2~Ih6ZJ6q96Z757H9yI01IrC7t6Eh8F3vYdAyYH65cSgl3Pqcq9jEYuRZezDNzFZ4XkWzD4JqShEdsi8F21gH~uQg6Tlb9kjxUJDNFgPON0y18QS-CGwZCB-~e7XxeeRSoq5R5G3yOI5eDuK7MOHMmSmKCNkcRX7P2qvjQCBHQ9tzmFL6oyV~MI91Gre6KJ7VL64JiBL0TxK7ccV7BED~jTnPXbr6TWo4OHbHV4gLrmo6R71lic6jLJKbD8XOeqDZEFB3JXVYgVL7GfP8t74-KOBYBrFiQqOrNCjJ4tOB6~K~p3MPJFhTLtpkxW~4A__",
    price: "25 DT",
    title: "Lorem ipsum 27",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor quam ut dui aliquam",
  },
  {
    id: 28,
    image:
      "https://s3-alpha-sig.figma.com/img/6fa8/f8cc/3661339c6c98c2bd9e5f10ecc65d76f3?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hDhGrKiBxtCnYMxVzaVnOVTX2~Ih6ZJ6q96Z757H9yI01IrC7t6Eh8F3vYdAyYH65cSgl3Pqcq9jEYuRZezDNzFZ4XkWzD4JqShEdsi8F21gH~uQg6Tlb9kjxUJDNFgPON0y18QS-CGwZCB-~e7XxeeRSoq5R5G3yOI5eDuK7MOHMmSmKCNkcRX7P2qvjQCBHQ9tzmFL6oyV~MI91Gre6KJ7VL64JiBL0TxK7ccV7BED~jTnPXbr6TWo4OHbHV4gLrmo6R71lic6jLJKbD8XOeqDZEFB3JXVYgVL7GfP8t74-KOBYBrFiQqOrNCjJ4tOB6~K~p3MPJFhTLtpkxW~4A__",
    price: "25 DT",
    title: "Lorem ipsum 28",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor quam ut dui aliquam",
  },
  {
    id: 29,
    image:
      "https://s3-alpha-sig.figma.com/img/77dc/ef27/f709147be988a17e8f90413ec520b056?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=RycZ3mbYy4mzvVleXm03oXSVWj7YPmZWaDZMWk3oad1wxbz~5pVBEdM-bSc4sJQe3zbD7DHO54y4tTftYtTJ8nQtCaZeXSLThjJkA6xDiiWnOQHpoFZmiiLYCnk804kHSu0~FWD0vRnnwCPJ4T9Krer1v9NxssFuSe8vwmtwVo34Ts010pJCH~TRDcSVC-CP1np4YDPnFqgl51q5H3MXDEdsiBsGPkEvFKevpmTymF~XmjeHWE-eIgwWMdc33RApUXGmvFXGeH7b4qWQVX7CaKGjMTsH4XWjKuBQ5oEnxxcWicFXo~lox4WclJlVv0ZsuQlUnTcm81MXQcqsTYUQqg__",
    price: "10 DT",
    title: "Lorem ipsum 29",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor quam ut dui aliquam",
  },
  {
    id: 30,
    image:
      "https://s3-alpha-sig.figma.com/img/eb97/b578/d7632ea1786432ea864388c18dcbc66c?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=T9sOSi5em3kvaF1XMGZKssILFuk5PG~2swZy2CNIYJIhJwgXp5i1dVeDjxHK24xZQV3WmH6ia4ljJpHm0Oxh7vNUqSbMDOXq1bCNBp0MCl~rjkGUSer9lglFEMxSOKY8a4a8xQXFAZSg9LofcBJpLILoAffOPbHOihobDcWYGst9mfxLjWJyMsbrUyjSlLCRtcD2suoCHZiAXm9QvKN9oPa19SVtKAmi4E6jrRg1hUAUd-J66~zAWEEK5E7PZItzf-Eo4leOTjUcaWrQyBC6X5tGQSs7Wqhtg5Wr04KkO5Liimy19LuO0hUQ1XU7HJ9LOD1MmuwFH4LiTGgT5S~H6g__",
    price: "25 DT",
    title: "Lorem ipsum 30",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor quam ut dui aliquam",
  },
  {
    id: 31,
    image:
      "https://s3-alpha-sig.figma.com/img/6fa8/f8cc/3661339c6c98c2bd9e5f10ecc65d76f3?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hDhGrKiBxtCnYMxVzaVnOVTX2~Ih6ZJ6q96Z757H9yI01IrC7t6Eh8F3vYdAyYH65cSgl3Pqcq9jEYuRZezDNzFZ4XkWzD4JqShEdsi8F21gH~uQg6Tlb9kjxUJDNFgPON0y18QS-CGwZCB-~e7XxeeRSoq5R5G3yOI5eDuK7MOHMmSmKCNkcRX7P2qvjQCBHQ9tzmFL6oyV~MI91Gre6KJ7VL64JiBL0TxK7ccV7BED~jTnPXbr6TWo4OHbHV4gLrmo6R71lic6jLJKbD8XOeqDZEFB3JXVYgVL7GfP8t74-KOBYBrFiQqOrNCjJ4tOB6~K~p3MPJFhTLtpkxW~4A__",
    price: "25 DT",
    title: "Lorem ipsum 31",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor quam ut dui aliquam",
  },
  {
    id: 32,
    image:
      "https://s3-alpha-sig.figma.com/img/6fa8/f8cc/3661339c6c98c2bd9e5f10ecc65d76f3?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hDhGrKiBxtCnYMxVzaVnOVTX2~Ih6ZJ6q96Z757H9yI01IrC7t6Eh8F3vYdAyYH65cSgl3Pqcq9jEYuRZezDNzFZ4XkWzD4JqShEdsi8F21gH~uQg6Tlb9kjxUJDNFgPON0y18QS-CGwZCB-~e7XxeeRSoq5R5G3yOI5eDuK7MOHMmSmKCNkcRX7P2qvjQCBHQ9tzmFL6oyV~MI91Gre6KJ7VL64JiBL0TxK7ccV7BED~jTnPXbr6TWo4OHbHV4gLrmo6R71lic6jLJKbD8XOeqDZEFB3JXVYgVL7GfP8t74-KOBYBrFiQqOrNCjJ4tOB6~K~p3MPJFhTLtpkxW~4A__",
    price: "25 DT",
    title: "Lorem ipsum 32",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor quam ut dui aliquam",
  },
  {
    id: 33,
    image:
      "https://s3-alpha-sig.figma.com/img/77dc/ef27/f709147be988a17e8f90413ec520b056?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=RycZ3mbYy4mzvVleXm03oXSVWj7YPmZWaDZMWk3oad1wxbz~5pVBEdM-bSc4sJQe3zbD7DHO54y4tTftYtTJ8nQtCaZeXSLThjJkA6xDiiWnOQHpoFZmiiLYCnk804kHSu0~FWD0vRnnwCPJ4T9Krer1v9NxssFuSe8vwmtwVo34Ts010pJCH~TRDcSVC-CP1np4YDPnFqgl51q5H3MXDEdsiBsGPkEvFKevpmTymF~XmjeHWE-eIgwWMdc33RApUXGmvFXGeH7b4qWQVX7CaKGjMTsH4XWjKuBQ5oEnxxcWicFXo~lox4WclJlVv0ZsuQlUnTcm81MXQcqsTYUQqg__",
    price: "10 DT",
    title: "Lorem ipsum 33",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor quam ut dui aliquam",
  },
  {
    id: 34,
    image:
      "https://s3-alpha-sig.figma.com/img/eb97/b578/d7632ea1786432ea864388c18dcbc66c?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=T9sOSi5em3kvaF1XMGZKssILFuk5PG~2swZy2CNIYJIhJwgXp5i1dVeDjxHK24xZQV3WmH6ia4ljJpHm0Oxh7vNUqSbMDOXq1bCNBp0MCl~rjkGUSer9lglFEMxSOKY8a4a8xQXFAZSg9LofcBJpLILoAffOPbHOihobDcWYGst9mfxLjWJyMsbrUyjSlLCRtcD2suoCHZiAXm9QvKN9oPa19SVtKAmi4E6jrRg1hUAUd-J66~zAWEEK5E7PZItzf-Eo4leOTjUcaWrQyBC6X5tGQSs7Wqhtg5Wr04KkO5Liimy19LuO0hUQ1XU7HJ9LOD1MmuwFH4LiTGgT5S~H6g__",
    price: "25 DT",
    title: "Lorem ipsum 34",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor quam ut dui aliquam",
  },
  {
    id: 35,
    image:
      "https://s3-alpha-sig.figma.com/img/6fa8/f8cc/3661339c6c98c2bd9e5f10ecc65d76f3?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hDhGrKiBxtCnYMxVzaVnOVTX2~Ih6ZJ6q96Z757H9yI01IrC7t6Eh8F3vYdAyYH65cSgl3Pqcq9jEYuRZezDNzFZ4XkWzD4JqShEdsi8F21gH~uQg6Tlb9kjxUJDNFgPON0y18QS-CGwZCB-~e7XxeeRSoq5R5G3yOI5eDuK7MOHMmSmKCNkcRX7P2qvjQCBHQ9tzmFL6oyV~MI91Gre6KJ7VL64JiBL0TxK7ccV7BED~jTnPXbr6TWo4OHbHV4gLrmo6R71lic6jLJKbD8XOeqDZEFB3JXVYgVL7GfP8t74-KOBYBrFiQqOrNCjJ4tOB6~K~p3MPJFhTLtpkxW~4A__",
    price: "25 DT",
    title: "Lorem ipsum 35",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor quam ut dui aliquam",
  },
  {
    id: 36,
    image:
      "https://s3-alpha-sig.figma.com/img/6fa8/f8cc/3661339c6c98c2bd9e5f10ecc65d76f3?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hDhGrKiBxtCnYMxVzaVnOVTX2~Ih6ZJ6q96Z757H9yI01IrC7t6Eh8F3vYdAyYH65cSgl3Pqcq9jEYuRZezDNzFZ4XkWzD4JqShEdsi8F21gH~uQg6Tlb9kjxUJDNFgPON0y18QS-CGwZCB-~e7XxeeRSoq5R5G3yOI5eDuK7MOHMmSmKCNkcRX7P2qvjQCBHQ9tzmFL6oyV~MI91Gre6KJ7VL64JiBL0TxK7ccV7BED~jTnPXbr6TWo4OHbHV4gLrmo6R71lic6jLJKbD8XOeqDZEFB3JXVYgVL7GfP8t74-KOBYBrFiQqOrNCjJ4tOB6~K~p3MPJFhTLtpkxW~4A__",
    price: "25 DT",
    title: "Lorem ipsum 36",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor quam ut dui aliquam",
  },
  {
    id: 37,
    image:
      "https://s3-alpha-sig.figma.com/img/77dc/ef27/f709147be988a17e8f90413ec520b056?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=RycZ3mbYy4mzvVleXm03oXSVWj7YPmZWaDZMWk3oad1wxbz~5pVBEdM-bSc4sJQe3zbD7DHO54y4tTftYtTJ8nQtCaZeXSLThjJkA6xDiiWnOQHpoFZmiiLYCnk804kHSu0~FWD0vRnnwCPJ4T9Krer1v9NxssFuSe8vwmtwVo34Ts010pJCH~TRDcSVC-CP1np4YDPnFqgl51q5H3MXDEdsiBsGPkEvFKevpmTymF~XmjeHWE-eIgwWMdc33RApUXGmvFXGeH7b4qWQVX7CaKGjMTsH4XWjKuBQ5oEnxxcWicFXo~lox4WclJlVv0ZsuQlUnTcm81MXQcqsTYUQqg__",
    price: "10 DT",
    title: "Lorem ipsum 37",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor quam ut dui aliquam",
  },
  {
    id: 38,
    image:
      "https://s3-alpha-sig.figma.com/img/eb97/b578/d7632ea1786432ea864388c18dcbc66c?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=T9sOSi5em3kvaF1XMGZKssILFuk5PG~2swZy2CNIYJIhJwgXp5i1dVeDjxHK24xZQV3WmH6ia4ljJpHm0Oxh7vNUqSbMDOXq1bCNBp0MCl~rjkGUSer9lglFEMxSOKY8a4a8xQXFAZSg9LofcBJpLILoAffOPbHOihobDcWYGst9mfxLjWJyMsbrUyjSlLCRtcD2suoCHZiAXm9QvKN9oPa19SVtKAmi4E6jrRg1hUAUd-J66~zAWEEK5E7PZItzf-Eo4leOTjUcaWrQyBC6X5tGQSs7Wqhtg5Wr04KkO5Liimy19LuO0hUQ1XU7HJ9LOD1MmuwFH4LiTGgT5S~H6g__",
    price: "25 DT",
    title: "Lorem ipsum 38",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor quam ut dui aliquam",
  },
  {
    id: 39,
    image:
      "https://s3-alpha-sig.figma.com/img/6fa8/f8cc/3661339c6c98c2bd9e5f10ecc65d76f3?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hDhGrKiBxtCnYMxVzaVnOVTX2~Ih6ZJ6q96Z757H9yI01IrC7t6Eh8F3vYdAyYH65cSgl3Pqcq9jEYuRZezDNzFZ4XkWzD4JqShEdsi8F21gH~uQg6Tlb9kjxUJDNFgPON0y18QS-CGwZCB-~e7XxeeRSoq5R5G3yOI5eDuK7MOHMmSmKCNkcRX7P2qvjQCBHQ9tzmFL6oyV~MI91Gre6KJ7VL64JiBL0TxK7ccV7BED~jTnPXbr6TWo4OHbHV4gLrmo6R71lic6jLJKbD8XOeqDZEFB3JXVYgVL7GfP8t74-KOBYBrFiQqOrNCjJ4tOB6~K~p3MPJFhTLtpkxW~4A__",
    price: "25 DT",
    title: "Lorem ipsum 39",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor quam ut dui aliquam",
  },
  {
    id: 40,
    image:
      "https://s3-alpha-sig.figma.com/img/6fa8/f8cc/3661339c6c98c2bd9e5f10ecc65d76f3?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hDhGrKiBxtCnYMxVzaVnOVTX2~Ih6ZJ6q96Z757H9yI01IrC7t6Eh8F3vYdAyYH65cSgl3Pqcq9jEYuRZezDNzFZ4XkWzD4JqShEdsi8F21gH~uQg6Tlb9kjxUJDNFgPON0y18QS-CGwZCB-~e7XxeeRSoq5R5G3yOI5eDuK7MOHMmSmKCNkcRX7P2qvjQCBHQ9tzmFL6oyV~MI91Gre6KJ7VL64JiBL0TxK7ccV7BED~jTnPXbr6TWo4OHbHV4gLrmo6R71lic6jLJKbD8XOeqDZEFB3JXVYgVL7GfP8t74-KOBYBrFiQqOrNCjJ4tOB6~K~p3MPJFhTLtpkxW~4A__",
    price: "25 DT",
    title: "Lorem ipsum 40",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor quam ut dui aliquam",
  },
];

const CatalogueArticles = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  // Calcul des produits à afficher pour la page courante
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = product.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(product.length / productsPerPage);

  return (
    <div className="p-6 min-h-screen">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        {/* Products Grid - Maintenant on utilise currentProducts au lieu de product */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-secondaryLight"
            >
              <div className="relative overflow-hidden rounded-lg aspect-square">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-primaryDark text-white text-sm font-bold py-1 px-3 rounded-full shadow-md">
                  {product.price}
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-primaryDark mb-2">
                  {product.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                <button className="w-full bg-secondary hover:bg-tertiaryLight text-primaryDark font-medium py-2 px-4 rounded-full transition-colors duration-300">
                  Ajouter au panier
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination (reste inchangé) */}
        <div className="mt-12 flex justify-center items-center gap-4">
          <button
            className={`flex items-center justify-center w-10 h-10 rounded-full ${
              currentPage === 1
                ? "bg-tertiary text-gray-400 cursor-not-allowed"
                : "bg-secondary hover:bg-tertiaryLight text-primaryDark"
            } transition-colors duration-300`}
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentPage === i + 1
                    ? "bg-primaryDark text-white"
                    : "bg-secondary text-primaryDark hover:bg-tertiaryLight"
                } transition-colors duration-300`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            className={`flex items-center justify-center w-10 h-10 rounded-full ${
              currentPage === totalPages
                ? "bg-tertiary text-gray-400 cursor-not-allowed"
                : "bg-secondary hover:bg-tertiaryLight text-primaryDark"
            } transition-colors duration-300`}
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CatalogueArticles;
