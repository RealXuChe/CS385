"use client";
import { TextField, Box, Button, Grid, Paper, Typography } from "@mui/material";
import { Snackbar, Alert } from "@mui/material";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const toolName = "bintree";

class Pair<T1, T2> {
  constructor(
    public first: T1,
    public second: T2,
  ) {}
  equals(other: Pair<T1, T2>): boolean {
    return this.first === other.first && this.second === other.second;
  }
}
class PairSet<T1, T2> extends Set<Pair<T1, T2>> {
  add(pair: Pair<T1, T2>): this {
    if (!Array.from(this).some((p) => p.equals(pair))) super.add(pair);
    return this;
  }
  delete(pair: Pair<T1, T2>): boolean {
    const found = Array.from(this).find((p) => p.equals(pair));
    if (found) return super.delete(found);
    return false;
  }
  has(pair: Pair<T1, T2>): boolean {
    return Array.from(this).some((p) => p.equals(pair));
  }
}

class Queue<T> {
  private elements: T[] = [];
  push(element: T): void {
    this.elements.push(element);
  }
  pop(): T {
    return this.elements.shift()!;
  }
  front(): T {
    return this.elements[0];
  }
  empty(): boolean {
    return this.elements.length === 0;
  }
  size(): number {
    return this.elements.length;
  }
}

const Graphviz = dynamic(() => import("graphviz-react"), { ssr: false });
const dotHead: string =
  'graph g { graph[ordering="out" bgcolor="transparent"];';
const dotTail: string = ' nullnode[style="invis"]; }';
let nodes = new Set<string>();
let edges = new PairSet<string, string>();
let deg = new Map<string, number>();
let root = "";

export default function Home() {
  // let testDot: string = 'graph g { graph[ordering="out"]; Gagaga[shape="circle"]; C--nullnode[style="invis"]; A[shape="circle"]; B[shape="circle"]; C[shape="circle"]; D[shape="circle"]; E[shape="circle"]; F[shape="circle"]; nullnode[style="invis"]; A--B; A--C; B--D; B--E; C--F; Gagaga--A; gagaga--G; G--GG; GG--GGG;  }';
  const [dot, setDot] = useState(dotHead + dotTail);
  const drawGraph = () => {
    let newDot = dotHead;
    const addEdge = (u: string, v: string) => {
      newDot += u + "--" + v + "; ";
    };
    const addNode = (u: string) => {
      newDot += u + "[" + "shape=circle" + "]" + "; ";
    };
    edges.forEach((e) => {
      if (e.first == root) addEdge(e.first, e.second);
    });
    edges.forEach((e) => {
      if (e.first != root) addEdge(e.first, e.second);
    });
    nodes.forEach((node) => {
      addNode(node);
    });
    nodes.forEach((node) => {
      if (node == root && deg.get(node)! == 1)
        addEdge(node, 'nullnode[style="invis"]');
      if (node != root && deg.get(node)! == 1)
        addEdge(node, 'nullnode[style="invis"]'),
          addEdge(node, 'nullnode[style="invis"]');
      if (node != root && deg.get(node)! == 2)
        addEdge(node, 'nullnode[style="invis"]');
    });
    newDot += dotTail;
    // console.log(newDot);
    setDot(newDot);
    updateHistory(edges, nodes);
  };

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const showAlert = (str: string) => {
    setAlertMessage(str);
    setOpenAlert(true);
  };
  const hideAlert = () => {
    setOpenAlert(false);
  };

  const [nodeToAdd, setNodeToAdd] = useState("");
  const [nodeToDel, setNodeToDel] = useState("");
  const [EdgeToAddU, setEdgeToAddU] = useState("");
  const [EdgeToAddV, setEdgeToAddV] = useState("");
  const [EdgeToDelU, setEdgeToDelU] = useState("");
  const [EdgeToDelV, setEdgeToDelV] = useState("");

  const handleOnChangeOfAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
    let nowText = event.target.value;
    nowText = nowText.trim();
    if (nowText.indexOf(" ") != -1) return;
    setNodeToAdd(nowText);
  };

  const handleOnChangeOfDel = (event: React.ChangeEvent<HTMLInputElement>) => {
    let nowText = event.target.value;
    nowText = nowText.trim();
    if (nowText.indexOf(" ") != -1) return;
    setNodeToDel(nowText);
  };

  const handleOnChangeOfAddU = (event: React.ChangeEvent<HTMLInputElement>) => {
    let nowText = event.target.value;
    nowText = nowText.trim();
    if (nowText.indexOf(" ") != -1) return;
    setEdgeToAddU(nowText);
  };

  const handleOnChangeOfAddV = (event: React.ChangeEvent<HTMLInputElement>) => {
    let nowText = event.target.value;
    nowText = nowText.trim();
    if (nowText.indexOf(" ") != -1) return;
    setEdgeToAddV(nowText);
  };

  const handleOnChangeOfDelU = (event: React.ChangeEvent<HTMLInputElement>) => {
    let nowText = event.target.value;
    nowText = nowText.trim();
    if (nowText.indexOf(" ") != -1) return;
    setEdgeToDelU(nowText);
  };

  const handleOnChangeOfDelV = (event: React.ChangeEvent<HTMLInputElement>) => {
    let nowText = event.target.value;
    nowText = nowText.trim();
    if (nowText.indexOf(" ") != -1) return;
    setEdgeToDelV(nowText);
  };

  const addNode = () => {
    if (nodeToAdd == "") return;
    nodes.add(nodeToAdd);
    setNodeToAdd("");

    // init the deg info
    if (!deg.has(nodeToAdd)) deg.set(nodeToAdd, 0);
    // maybe it should be the root
    if (root == "") root = nodeToAdd;

    drawGraph();
  };

  const actualDelEdge = (e: Pair<string, string>) => {
    // update the degree info, and maybe need to delete the node
    edges.delete(e);
    if (deg.has(e.first)) deg.set(e.first, deg.get(e.first)! - 1);
    if (deg.has(e.second)) deg.set(e.second, deg.get(e.second)! - 1);
    if (deg.has(e.first) && deg.get(e.first) == 0) {
      nodes.delete(e.first);
      deg.delete(e.first);
    }
    if (deg.has(e.second) && deg.get(e.second) == 0) {
      nodes.delete(e.second);
      deg.delete(e.second);
    }
  };

  const delNode = () => {
    if (nodeToDel == "") return;
    nodes.delete(nodeToDel);
    setNodeToDel("");
    deg.delete(nodeToDel);

    // erase every edge that contains the node
    let needToDel = new PairSet<string, string>();
    edges.forEach((e) => {
      if (e.first == nodeToDel || e.second == nodeToDel) needToDel.add(e);
    });
    needToDel.forEach((e) => {
      actualDelEdge(e);
    });
    // if it is the root, update root
    if (root == nodeToDel) {
      root = "";
      nodes.forEach((node) => {
        if (root == "") root = node;
      });
    }

    drawGraph();
  };

  const hasCircle = () => {
    let deg2 = new Map(deg);
    let edges2 = new PairSet(edges);
    edges.forEach((e) => {
      edges2.add(new Pair(e.second, e.first));
    });
    let q = new Queue<string>(),
      n = 0;
    nodes.forEach((e) => {
      if (deg2.get(e) == 1) q.push(e);
      if (deg2.get(e)! > 0) ++n;
    });
    let cnt = 0;
    while (!q.empty()) {
      ++cnt;
      let u = q.front();
      q.pop();
      edges2.forEach((e) => {
        if (e.first == u) {
          let v = e.second;
          deg2.set(v, deg2.get(v)! - 1);
          if (deg2.get(v) == 1) q.push(v);
        }
      });
    }
    return cnt < n;
  };

  const addEdge = () => {
    setEdgeToAddU(""), setEdgeToAddV("");
    if (EdgeToAddU == "" || EdgeToAddV == "")
      return showAlert("Invalid input: nodes cannot be empty!");
    if (EdgeToAddU == EdgeToAddV)
      return showAlert("Invalid input: nodes cannot repeat!");
    if (edges.has(new Pair(EdgeToAddU, EdgeToAddV)))
      return showAlert("Invalid input: repeated edge.");
    if (root == "") root = EdgeToAddU;

    // check degrees
    if (EdgeToAddU == root && deg.has(EdgeToAddU) && deg.get(EdgeToAddU)! >= 2)
      return showAlert("Not a binary tree.");
    if (EdgeToAddU != root && deg.has(EdgeToAddU) && deg.get(EdgeToAddU)! >= 3)
      return showAlert("Not a binary tree.");
    if (EdgeToAddV == root && deg.has(EdgeToAddV) && deg.get(EdgeToAddV)! >= 2)
      return showAlert("Not a binary tree.");
    if (EdgeToAddV != root && deg.has(EdgeToAddV) && deg.get(EdgeToAddV)! >= 3)
      return showAlert("Not a binary tree.");

    let edgesBak = new PairSet(edges);
    let degBak = new Map(deg);
    let nodesBak = new Set(nodes);

    edges.add(new Pair(EdgeToAddU, EdgeToAddV));

    // if the edge contains new nodes, create nodes first
    nodes.add(EdgeToAddU);
    nodes.add(EdgeToAddV);
    // update the degree info
    if (!deg.has(EdgeToAddU)) deg.set(EdgeToAddU, 0);
    if (!deg.has(EdgeToAddV)) deg.set(EdgeToAddV, 0);
    deg.set(EdgeToAddU, deg.get(EdgeToAddU)! + 1);
    deg.set(EdgeToAddV, deg.get(EdgeToAddV)! + 1);

    if (hasCircle()) {
      showAlert("Invalid input: has a circle.");
      edges = new PairSet(edgesBak);
      deg = new Map(degBak);
      nodes = new Set(nodesBak);
      return;
    }

    drawGraph();
  };

  const delEdge = () => {
    setEdgeToDelU(""), setEdgeToDelV("");
    if (EdgeToDelU == "" || EdgeToDelV == "")
      return showAlert("Invalid input: nodes cannot be empty!");
    if (EdgeToDelU == EdgeToDelV)
      return showAlert("Invalid input: nodes cannot repeat!");
    if (
      !edges.has(new Pair(EdgeToDelU, EdgeToDelV)) &&
      edges.has(new Pair(EdgeToDelV, EdgeToDelU))
    )
      actualDelEdge(new Pair(EdgeToDelV, EdgeToDelU));
    else if (
      edges.has(new Pair(EdgeToDelU, EdgeToDelV)) &&
      !edges.has(new Pair(EdgeToDelV, EdgeToDelU))
    )
      actualDelEdge(new Pair<string, string>(EdgeToDelU, EdgeToDelV));

    drawGraph();
  };

  const updateHistory = (
    edges: PairSet<string, string>,
    nodes: Set<string>,
  ) => {
    const formatDate = (date: Date) => {
      return (
        date.getFullYear() +
        "-" +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + date.getDate()).slice(-2) +
        " " +
        ("0" + date.getHours()).slice(-2) +
        ":" +
        ("0" + date.getMinutes()).slice(-2) +
        ":" +
        ("0" + date.getSeconds()).slice(-2)
      );
    };

    let now = "";
    edges.forEach((e) => {
      now += e.first + "-" + e.second + ",";
    });
    now = now.substring(0, now.length - 1);
    now += "|||";
    nodes.forEach((node) => {
      now += node + ",";
    });
    now = now.substring(0, now.length - 1);
    console.log(now);

    let rawInfo = localStorage.getItem(toolName);
    if (rawInfo == null) {
      let newInfo = {
        query: [now],
        time: [formatDate(new Date())],
      };
      localStorage.setItem(toolName, JSON.stringify(newInfo));
    } else {
      let parsedInfo = JSON.parse(rawInfo);
      let queries = parsedInfo["query"];
      let times = parsedInfo["time"];
      let last = queries[queries.length - 1];
      let nowQuery = now;
      let nowTime = formatDate(new Date());
      if (now != last) {
        queries.push(nowQuery);
        times.push(nowTime);
        let newInfo = {
          query: queries,
          time: times,
        };
        let newInfoStr = JSON.stringify(newInfo);
        localStorage.setItem(toolName, newInfoStr);
      }
    }
  };
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const history = queryParams.get("history");
    if (history != null) {
      let edgesRaw = history.split("|||")[0];
      let edgesRaw2 = edgesRaw.length > 0 ? edgesRaw.split(",") : [];
      let edges = new PairSet<string, string>();
      for (const edge of edgesRaw2) {
        let u = edge.split("-")[0];
        let v = edge.split("-")[1];
        edges.add(new Pair(u, v));
      }
      let nodesRaw = history.split("|||")[1];
      let nodes = nodesRaw.split(",");
      let newDot = dotHead;
      const addEdge = (u: string, v: string) => {
        newDot += u + "--" + v + "; ";
      };
      const addNode = (u: string) => {
        newDot += u + "[" + "shape=circle" + "]" + "; ";
      };
      edges.forEach((e) => {
        if (e.first == root) addEdge(e.first, e.second);
      });
      edges.forEach((e) => {
        if (e.first != root) addEdge(e.first, e.second);
      });
      nodes.forEach((node) => {
        addNode(node);
      });
      nodes.forEach((node) => {
        if (node == root && deg.get(node)! == 1)
          addEdge(node, 'nullnode[style="invis"]');
        if (node != root && deg.get(node)! == 1)
          addEdge(node, 'nullnode[style="invis"]'),
            addEdge(node, 'nullnode[style="invis"]');
        if (node != root && deg.get(node)! == 2)
          addEdge(node, 'nullnode[style="invis"]');
      });
      newDot += dotTail;
      setDot(newDot);
    }
  }, [setDot]);

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" padding={2}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box
            display="flex"
            flexDirection="column"
            p={2}
            border={1}
            borderRadius={2}
            borderColor="grey.300"
            sx={{ height: "100%", width: "100%" }}
          >
            <Paper elevation={3} sx={{ p: 2, mb: 4, width: "100%" }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Node Operations
              </Typography>
              <TextField
                fullWidth
                type="text"
                label="Add Node"
                id="nodeToAdd"
                value={nodeToAdd}
                onChange={handleOnChangeOfAdd}
                margin="normal"
              />
              <Box display="flex" justifyContent="center" sx={{ mt: 1 }}>
                <Button variant="outlined" color="primary" onClick={addNode}>
                  Add Node
                </Button>
              </Box>
              <TextField
                fullWidth
                type="text"
                label="Delete Node"
                id="nodeToDel"
                value={nodeToDel}
                onChange={handleOnChangeOfDel}
                margin="normal"
              />
              <Box display="flex" justifyContent="center" sx={{ mt: 1 }}>
                <Button variant="outlined" color="secondary" onClick={delNode}>
                  Delete Node
                </Button>
              </Box>
            </Paper>
            <Paper elevation={3} sx={{ p: 2, width: "100%" }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Edge Operations
              </Typography>
              <Box
                display="flex"
                justifyContent="space-between"
                width="100%"
                mt={2}
              >
                <TextField
                  fullWidth
                  type="text"
                  label="Add Edge From"
                  id="edgeToAddU"
                  value={EdgeToAddU}
                  onChange={handleOnChangeOfAddU}
                  margin="normal"
                  sx={{ mr: 1 }}
                />
                <TextField
                  fullWidth
                  type="text"
                  label="Add Edge To"
                  id="edgeToAddV"
                  value={EdgeToAddV}
                  onChange={handleOnChangeOfAddV}
                  margin="normal"
                />
              </Box>
              <Box display="flex" justifyContent="center" sx={{ mt: 1 }}>
                <Button variant="outlined" color="primary" onClick={addEdge}>
                  Add Edge
                </Button>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                width="100%"
                mt={2}
              >
                <TextField
                  fullWidth
                  type="text"
                  label="Delete Edge From"
                  id="edgeToDelU"
                  value={EdgeToDelU}
                  onChange={handleOnChangeOfDelU}
                  margin="normal"
                  sx={{ mr: 1 }}
                />
                <TextField
                  fullWidth
                  type="text"
                  label="Delete Edge To"
                  id="edgeToDelV"
                  value={EdgeToDelV}
                  onChange={handleOnChangeOfDelV}
                  margin="normal"
                />
              </Box>
              <Box display="flex" justifyContent="center" sx={{ mt: 1 }}>
                <Button variant="outlined" color="secondary" onClick={delEdge}>
                  Delete Edge
                </Button>
              </Box>
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            display="flex"
            flexDirection="column"
            p={2}
            border={1}
            borderRadius={2}
            borderColor="grey.300"
            sx={{ height: "100%", width: "100%" }}
          >
            <Graphviz
              dot={dot}
              options={{ height: "600", width: "100%", zoom: false, fit: true }}
            />
          </Box>
        </Grid>
      </Grid>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={hideAlert}>
        <Alert onClose={hideAlert} severity="error" sx={{ width: "100%" }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
