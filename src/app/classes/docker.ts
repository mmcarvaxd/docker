export interface Docker {
    ID: string
    Containers: number
    ContainersRunning: number
    ContainersPaused: number
    ContainersStopped: number
    Images: number
    Driver: string
    DriverStatus: string[][]
    Plugins: Plugins
    MemoryLimit: boolean
    SwapLimit: boolean
    KernelMemory: boolean
    KernelMemoryTCP: boolean
    CpuCfsPeriod: boolean
    CpuCfsQuota: boolean
    CPUShares: boolean
    CPUSet: boolean
    PidsLimit: boolean
    IPv4Forwarding: boolean
    BridgeNfIptables: boolean
    BridgeNfIp6tables: boolean
    Debug: boolean
    NFd: number
    OomKillDisable: boolean
    NGoroutines: number
    SystemTime: string
    LoggingDriver: string
    CgroupDriver: string
    CgroupVersion: string
    NEventsListener: number
    KernelVersion: string
    OperatingSystem: string
    OSVersion: string
    OSType: string
    Architecture: string
    IndexServerAddress: string
    RegistryConfig: RegistryConfig
    NCPU: number
    MemTotal: number
    GenericResources: any
    DockerRootDir: string
    HttpProxy: string
    HttpsProxy: string
    NoProxy: string
    Name: string
    Labels: any[]
    ExperimentalBuild: boolean
    ServerVersion: string
    Runtimes: Runtimes
    DefaultRuntime: string
    Swarm: Swarm
    LiveRestoreEnabled: boolean
    Isolation: string
    InitBinary: string
    ContainerdCommit: ContainerdCommit
    RuncCommit: RuncCommit
    InitCommit: InitCommit
    SecurityOptions: string[]
    Warnings: string[]
}

export interface Plugins {
    Volume: string[]
    Network: string[]
    Authorization: any
    Log: string[]
}

export interface RegistryConfig {
    AllowNondistributableArtifactsCIDRs: any[]
    AllowNondistributableArtifactsHostnames: any[]
    InsecureRegistryCIDRs: string[]
    IndexConfigs: IndexConfigs
    Mirrors: any[]
}

export interface IndexConfigs {
    "docker.io": DockerIo
    "hubproxy.docker.internal:5000": HubproxyDockerInternal5000
}

export interface DockerIo {
    Name: string
    Mirrors: any[]
    Secure: boolean
    Official: boolean
}

export interface HubproxyDockerInternal5000 {
    Name: string
    Mirrors: any[]
    Secure: boolean
    Official: boolean
}

export interface Runtimes {
    "io.containerd.runc.v2": IoContainerdRuncV2
    "io.containerd.runtime.v1.linux": IoContainerdRuntimeV1Linux
    runc: Runc
}

export interface IoContainerdRuncV2 {
    path: string
}

export interface IoContainerdRuntimeV1Linux {
    path: string
}

export interface Runc {
    path: string
}

export interface Swarm {
    NodeID: string
    NodeAddr: string
    LocalNodeState: string
    ControlAvailable: boolean
    Error: string
    RemoteManagers: any
}

export interface ContainerdCommit {
    ID: string
    Expected: string
}

export interface RuncCommit {
    ID: string
    Expected: string
}

export interface InitCommit {
    ID: string
    Expected: string
}
