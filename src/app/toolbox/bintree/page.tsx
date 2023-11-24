"use client";
import { TextField, Box, Button } from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import dynamic from "next/dynamic";
import { useState } from "react";

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

const Graphviz = dynamic(() => import("graphviz-react"), { ssr: false });
const dotHead: string = 'graph g { graph[ordering="out"];';
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

  const addEdge = () => {
    if (EdgeToAddU == "" || EdgeToAddV == "") {
      showAlert("Invalid input: nodes cannot be empty!");
      return;
    }
    if (EdgeToAddU == EdgeToAddV) {
      showAlert("Invalid input: nodes cannot repeat!");
      return;
    }
    if (edges.has(new Pair(EdgeToAddV, EdgeToAddU))) return;
    edges.add(new Pair(EdgeToAddU, EdgeToAddV));
    setEdgeToAddU(""), setEdgeToAddV("");

    // if the edge contains new nodes, create nodes first
    nodes.add(EdgeToAddU);
    nodes.add(EdgeToAddV);
    // update the degree info
    if (!deg.has(EdgeToAddU)) deg.set(EdgeToAddU, 0);
    if (!deg.has(EdgeToAddV)) deg.set(EdgeToAddV, 0);
    deg.set(EdgeToAddU, deg.get(EdgeToAddU)! + 1);
    deg.set(EdgeToAddV, deg.get(EdgeToAddV)! + 1);

    drawGraph();
  };

  const delEdge = () => {
    if (EdgeToDelU == "" || EdgeToDelV == "") {
      showAlert("Invalid input: nodes cannot be empty!");
      return;
    }
    if (EdgeToDelU == EdgeToDelV) {
      showAlert("Invalid input: nodes cannot repeat!");
      return;
    }
    if (
      !edges.has(new Pair<string, string>(EdgeToDelU, EdgeToDelV)) &&
      edges.has(new Pair<string, string>(EdgeToDelV, EdgeToDelU))
    )
      actualDelEdge(new Pair<string, string>(EdgeToDelV, EdgeToDelU));
    else if (
      edges.has(new Pair<string, string>(EdgeToDelU, EdgeToDelV)) &&
      !edges.has(new Pair<string, string>(EdgeToDelV, EdgeToDelU))
    )
      actualDelEdge(new Pair<string, string>(EdgeToDelU, EdgeToDelV));
    setEdgeToDelU(""), setEdgeToDelV("");

    drawGraph();
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
    >
      <Box mt={2}>
        <TextField
          type="text"
          id="nodeToAdd"
          value={nodeToAdd}
          onChange={handleOnChangeOfAdd}
        />
        <Button onClick={addNode}>Add a node</Button>
      </Box>
      <Box mt={2}>
        <TextField
          type="text"
          id="nodeToDel"
          value={nodeToDel}
          onChange={handleOnChangeOfDel}
        />
        <Button onClick={delNode}>Delete a node</Button>
      </Box>
      <Box mt={2}>
        <TextField
          type="text"
          id="edgeToAddU"
          value={EdgeToAddU}
          onChange={handleOnChangeOfAddU}
        />
        <TextField
          type="text"
          id="edgeToAddV"
          value={EdgeToAddV}
          onChange={handleOnChangeOfAddV}
        />
        <Button onClick={addEdge}>Add an edge</Button>
      </Box>
      <Box mt={2}>
        <TextField
          type="text"
          id="edgeToDelU"
          value={EdgeToDelU}
          onChange={handleOnChangeOfDelU}
        />
        <TextField
          type="text"
          id="edgeToDelV"
          value={EdgeToDelV}
          onChange={handleOnChangeOfDelV}
        />
        <Button onClick={delEdge}>Delete an edge</Button>
      </Box>

      <Graphviz dot={dot} className="p-8" />

      <div>
        <Dialog open={openAlert} onClose={hideAlert}>
          <DialogTitle>Error</DialogTitle>
          <DialogContent>
            <DialogContentText>{alertMessage}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={hideAlert}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    </Box>
  );
}
