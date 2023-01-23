// import { computed, Ref, ref } from "vue";

// import PaginationConfig from "@/types/PaginationConfig";

// export function usePagination<T>(config: PaginationConfig<T>) {
//   const rowsPerPage: number = config.rowsPerPage || 10;

//   const numberOfPages = computed(() =>
//     Math.ceil((config.arrayToPaginate.length || 0) / rowsPerPage)
//   );

//   // prevents current page from going out of range
//   if (!config.currentPage || config.currentPage < 1) config.currentPage = 1;
//   if (config.currentPage > numberOfPages.value)
//     config.currentPage = numberOfPages.value;

//   const paginatedArray = computed(() =>
//     config.arrayToPaginate.slice(
//       (config.currentPage - 1) * rowsPerPage,
//       config.currentPage * rowsPerPage
//     )
//   );

//   // for the next and previous buttons
//   const canGoBack: Ref<boolean> = ref(false),
//     canGoForward: Ref<boolean> = ref(false);

//   if (config.currentPage > 1) canGoBack.value = true;
//   if (config.currentPage < numberOfPages.value) canGoForward.value = true;

//   return {
//     paginatedArray,
//     numberOfPages,
//     canGoBack,
//     canGoForward,
//   };
// }

// // const pagginated = usePagination({
// //   rowsPerPage: 2,
// //   arrayToPaginate: [1, 2, 3, 4, 5, 6, 7, 8, 9],
// //   currentPage: 6,
// // });
// // console.log(pagginated.paginatedArray.value);
// // console.log(pagginated.numberOfPages.value);
// // console.log(pagginated.canGoBack.value);
// // console.log(pagginated.canGoForward.value);

import { computed, ref } from "vue";

import PaginationConfig from "@/types/PaginationConfig";

export function usePagination<T>(config: PaginationConfig<T>) {
  const rowsPerPage = config.rowsPerPage || ref(10);

  const numberOfPages = computed(() =>
    Math.ceil((config.arrayToPaginate.value.length || 0) / rowsPerPage.value)
  );

  // // Prevents current page from going out of range
  const currentPage = computed(() => {
    if (!config.currentPage.value || config.currentPage.value < 1) return 1;
    if (config.currentPage.value > numberOfPages.value)
      return numberOfPages.value;

    return config.currentPage.value;
  });

  const paginatedArray = computed(() =>
    config.arrayToPaginate.value.slice(
      (config.currentPage.value - 1) * rowsPerPage.value,
      config.currentPage.value * rowsPerPage.value
    )
  );

  const canGoBack = computed(() => currentPage.value > 1);

  const canGoForward = computed(() => currentPage.value < numberOfPages.value);

  return {
    paginatedArray,
    numberOfPages,
    canGoBack,
    canGoForward,
  };
}