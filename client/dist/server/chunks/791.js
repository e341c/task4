exports.id = 791;
exports.ids = [791];
exports.modules = {

/***/ 4377:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9648);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);
axios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (axios__WEBPACK_IMPORTED_MODULE_0__["default"].create({
    baseURL: "https://task4-server-4uuf.onrender.com"
}));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8966:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const config = {
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (config);


/***/ }),

/***/ 6791:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9090);
/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap_Table__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1553);
/* harmony import */ var react_bootstrap_Table__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Table__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1937);
/* harmony import */ var react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var date_fns_format__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4384);
/* harmony import */ var date_fns_format__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(date_fns_format__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var date_fns_parseISO__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1369);
/* harmony import */ var date_fns_parseISO__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(date_fns_parseISO__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _api_axios__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4377);
/* harmony import */ var _config_axiosConfig__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(8966);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_api_axios__WEBPACK_IMPORTED_MODULE_7__]);
_api_axios__WEBPACK_IMPORTED_MODULE_7__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];









function Users() {
    const [auth, setAuth] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false);
    const [userAuth, setUserAuth] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)([]);
    const [users, setUsers] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)([]);
    const [selectedItems, setSelectedItems] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)([]);
    function handleCheckbox(e) {
        let isSelected = e.target.checked;
        let value = e.target.value;
        if (isSelected) {
            setSelectedItems([
                ...selectedItems,
                value
            ]);
        } else {
            setSelectedItems((prevData)=>{
                return prevData.filter((id)=>{
                    return id !== value;
                });
            });
        }
    }
    function handleCheckAll() {
        if (users.length === selectedItems.length) {
            setSelectedItems([]);
        } else {
            const usersIds = users.map((user)=>{
                return user._id;
            });
            setSelectedItems(usersIds);
        }
    }
    const handleDelete = async (idArr)=>{
        try {
            idArr.map(async (id)=>{
                await _api_axios__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z.delete("/users/delete/" + id, _config_axiosConfig__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z);
            });
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };
    const handleUnblock = async (idArr)=>{
        try {
            idArr.map(async (id)=>{
                await _api_axios__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z.post("/users/unblock/" + id, _config_axiosConfig__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z).then((response)=>{
                    console.log(response);
                });
            });
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };
    const handleBlock = async (idArr)=>{
        try {
            idArr.map(async (id)=>{
                await _api_axios__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z.post("/users/block/" + id, _config_axiosConfig__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z);
            });
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(()=>{
        const fetchAllUsers = async ()=>{
            try {
                const res = await _api_axios__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z.get("/users", _config_axiosConfig__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z);
                setUsers(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        const userLogin = async ()=>{
            try {
                const res = await _api_axios__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z.get("/getuser", _config_axiosConfig__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z);
                setUserAuth(res.data);
                setAuth(res.data.status);
            } catch (err) {
                console.log(err);
            }
        };
        userLogin();
        fetchAllUsers();
    }, []);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "p-5",
        children: [
            auth && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "shadow-sm",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "p-3",
                        style: {
                            background: "rgba(0,0,0,.1)"
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "d-flex justify-content-between",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                        children: [
                                            "Selected items: ",
                                            selectedItems.toString()
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                        children: [
                                            "You logged in as: ",
                                            userAuth.email
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_3___default()), {
                                variant: "warning",
                                className: "me-3",
                                onClick: ()=>handleBlock(selectedItems),
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                                    style: {
                                        color: "rgba(1,1,1,0.7)"
                                    },
                                    children: "Block"
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_3___default()), {
                                variant: "success",
                                className: "me-3",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                    className: "d-flex align-items-center",
                                    style: {
                                        filter: "invert(100%)",
                                        width: "23px",
                                        height: "auto"
                                    },
                                    src: "/unlockIcon.png",
                                    alt: "",
                                    onClick: ()=>handleUnblock(selectedItems)
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_3___default()), {
                                variant: "danger",
                                className: "me-3",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                    className: "d-flex align-items-center",
                                    style: {
                                        filter: "invert(100%)",
                                        width: "23px",
                                        height: "auto"
                                    },
                                    src: "/deleteIcon.png",
                                    alt: "",
                                    onClick: ()=>handleDelete(selectedItems)
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((react_bootstrap_Table__WEBPACK_IMPORTED_MODULE_2___default()), {
                        striped: true,
                        bordered: true,
                        hover: true,
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("thead", {
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                type: "checkbox",
                                                onChange: handleCheckAll
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                            children: "ID"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                            children: "Name"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                            children: "Email"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                            children: "Registration time UTC"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                            children: "Last login time UTC"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                            children: "Status"
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("tbody", {
                                children: users.map((user)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                    type: "checkbox",
                                                    checked: selectedItems.includes(user._id),
                                                    value: user._id,
                                                    onChange: handleCheckbox,
                                                    name: "",
                                                    id: ""
                                                })
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                children: user._id
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                children: user.name
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                children: user.email
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                children: user.createdAt.replace(/\.\d+/, "")
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                children: user.updatedAt.replace(/\.\d+/, "")
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                children: user.status ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                    children: "Active"
                                                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                    children: "Blocked"
                                                })
                                            })
                                        ]
                                    }, user._id))
                            })
                        ]
                    })
                ]
            }),
            !auth && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "d-flex justify-content-center",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h2", {
                    children: [
                        "To see table of users you need to ",
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            href: "/login",
                            children: "login"
                        }),
                        " or ",
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            href: "/register",
                            children: "register"
                        })
                    ]
                })
            })
        ]
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Users);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9090:
/***/ (() => {



/***/ })

};
;